import React, {useContext} from 'react';

import * as yup from 'yup';

import {SafeAreaView, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {theme} from '../design-system/theme';
import {Row, Box, Column, IconButton, Text, Icon, Pressable} from '../design-system';
import {DismissKeyboard, Header, TextInputField} from '../components';
import {useCreateTeamContext} from '../contexts';
import {
  CreateScoreboardRequest,
  CreateScoreboardRequestModelTeams,
  TeamModelToJSON,
} from '../apiClient';
import {useMutation, useQueryClient} from 'react-query';
import {usePlatformApi} from '../hooks';
import {scoreboards} from '../constants';

const scoreboardSchema = yup.object().shape({
  name: yup.string().required('need a name for the scoreboard bud'),
  game: yup.string().required('you forgot to say what game it is'),
});

export const CreateScoreboard: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(scoreboardSchema),
  });

  // init the team context
  const teamContext = useCreateTeamContext();

  // init api
  const api = usePlatformApi();

  // init query client
  const queryClient = useQueryClient();

  // init the mutation
  const {mutate} = useMutation((data: CreateScoreboardRequest) => api.createScoreboard(data), {
    onSuccess: () => {
      // invalidate the scoreboards query
      queryClient.invalidateQueries(scoreboards());

      // go back to scoreboard
      navigation.navigate('Scoreboards');
    },
    onError: error => {
      // TODO: handle error with
      console.log(error);
    },
  });

  // handle submitting the scoreboard
  const saveScoreboard = React.useCallback(
    (data: {name: string; game: string}) => {
      const request: CreateScoreboardRequest = {
        createScoreboardRequestModel: {
          ...data,
          teams: teamContext.teams.map(t => ({
            name: t.name,
          })),
        },
      };

      mutate(request);
    },
    [teamContext],
  );

  // clear the teams from context when the component unmounts
  React.useEffect(() => {
    return () => {
      teamContext.clearTeams();
    };
  }, []);

  return (
    <DismissKeyboard>
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <Header.Root horizontalAlign="between">
            <Header.Cancel />
            <Header.Title>create scoreboard</Header.Title>
            {/* TODO: fix this */}
            <Header.Action onPress={handleSubmit(saveScoreboard)}>save</Header.Action>
          </Header.Root>
          <Column padding="default">
            <TextInputField name="name" label="name" control={control} />
            <TextInputField name="game" label="game" control={control} />
            <Row horizontalAlign="between">
              <Text styledAs="label">teams</Text>
              <IconButton onPress={() => navigation.navigate('CreateTeam')}>
                <Icon.Plus color={theme.colors.background.widget.default} width={20} height={20} />
              </IconButton>
            </Row>
            {teamContext.teams.length === 0 ? (
              <Column
                gap="small"
                style={{height: 100}}
                horizontalAlign="center"
                verticalAlign="center"
                backgroundColor="widgetSecondary"
                borderRadius="default"
              >
                <Text>💔</Text>
                <Text>no teams</Text>
              </Column>
            ) : (
              <Column>
                {teamContext.teams.map(t => {
                  return (
                    <Row
                      key={t.id}
                      padding="default"
                      backgroundColor="widgetSecondary"
                      borderRadius="default"
                      horizontalAlign="between"
                    >
                      <Text numberOfLines={1} style={{flex: 0.9}}>
                        {t.name}
                      </Text>
                      <Pressable onPress={() => teamContext.removeTeam(t.id)}>
                        <Icon.Times height={20} width={20} color={theme.colors.text.default} />
                      </Pressable>
                    </Row>
                  );
                })}
              </Column>
            )}
          </Column>
        </SafeAreaView>
      </ScrollView>
    </DismissKeyboard>
  );
};
