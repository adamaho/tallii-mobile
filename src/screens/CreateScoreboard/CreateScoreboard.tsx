import React from 'react';

import * as yup from 'yup';

import {SafeAreaView, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/screens';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Column} from '../../design-system';
import {DismissKeyboard, Header, TextInputField} from '../../components';
import {useCreateTeamContext} from '../../contexts';

import {CreateScoreboardRequest} from '../../apiClient';

import {useMutation, useQueryClient} from 'react-query';
import {usePlatformApi} from '../../hooks';
import {scoreboards} from '../../constants';
import {Teams} from './Teams';

const scoreboardSchema = yup.object().shape({
  name: yup.string().required('need a name for the scoreboard bud'),
  game: yup.string().required('you forgot to say what game it is'),
  teams: yup
    .array()
    .of(yup.string())
    .min(1, "it's no fun without teams")
    .required("it's no fun without teams"),
});

export const CreateScoreboard: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit, setValue} = useForm({
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
      console.log(data);
      const request: CreateScoreboardRequest = {
        createScoreboardRequestModel: {
          ...data,
          teams: teamContext.teams.map(t => ({
            name: t.name,
          })),
        },
      };

      // mutate(request);
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
            <Teams control={control} setValue={setValue} />
          </Column>
        </SafeAreaView>
      </ScrollView>
    </DismissKeyboard>
  );
};
