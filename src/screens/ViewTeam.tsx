import React from 'react';

import {Keyboard, SafeAreaView, TextInput} from 'react-native';

import {useQuery, useMutation, useQueryClient} from 'react-query';

import {RouteProp, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/screens';

import {DismissKeyboard, Header} from '../components';
import {Box, Heading, Column, Button} from '../design-system';

import {theme} from '../design-system/theme';

import {usePlatformApi} from '../hooks';
import {UpdateTeamRequest} from '../apiClient';

import {team, scoreboards} from '../constants';

export const ViewTeam: React.FunctionComponent = () => {
  // init state to get the new score
  const [score, setScore] = React.useState<number>(0);

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTeam'>>();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init api
  const api = usePlatformApi();

  // init query client
  const queryClient = useQueryClient();

  // init fetch team query
  const {data: currentTeam} = useQuery(
    team(route.params.teamId),
    () =>
      api.getTeam({
        teamId: route.params.teamId,
      }),
    {
      onSuccess: response => {
        setScore(response.score);
      },
    },
  );

  // init mutation to update the team
  const {mutate} = useMutation((data: UpdateTeamRequest) => api.updateTeam(data), {
    onSuccess: () => {
      // invalidate the team
      queryClient.invalidateQueries(team(route.params.teamId));

      // invalidate the scoreboard
      queryClient.invalidateQueries(scoreboards());

      // go back
      navigation.goBack();
    },
    onError: error => {
      // TODO show toast notification on error
      console.log(error);
    },
  });

  // handle updating the team score
  const handleUpdateTeam = React.useCallback(() => {
    const request: UpdateTeamRequest = {
      teamId: route.params.teamId,
      updateTeamRequestModel: {
        name: currentTeam?.name,
        score,
      },
    };

    Keyboard.dismiss();
    mutate(request);
  }, [score, route, currentTeam]);

  // handle change score
  const handleScoreChange = React.useCallback(score => {
    setScore(Number(score));
  }, []);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Header.Root horizontalAlign="right">
          <Header.Exit />
        </Header.Root>
        <Column padding="default" gap="xxxlarge">
          <Heading align="center">{currentTeam?.name}</Heading>
          <Column gap="large">
            <Box
              backgroundColor="widgetSecondary"
              padding="xlarge"
              borderRadius="large"
              width="full"
            >
              {!(currentTeam == null) && (
                <TextInput
                  defaultValue={currentTeam.score.toString()}
                  onChangeText={handleScoreChange}
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Nunito-Black',
                    fontSize: 64,
                    color: theme.colors.text.default,
                    minWidth: 100,
                    width: '100%',
                  }}
                  keyboardType="number-pad"
                />
              )}
            </Box>
            <Button.Root onPress={handleUpdateTeam}>
              <Button.Text>save</Button.Text>
            </Button.Root>
          </Column>
        </Column>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
