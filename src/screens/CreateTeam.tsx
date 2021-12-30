import React from 'react';

import * as yup from 'yup';

import {SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {theme} from '../design-system/theme';
import {Row, Box, Column, IconButton, Text, Icon} from '../design-system';
import {DismissKeyboard, Header, TextInputField} from '../components';
import {useCreateTeamContext} from '../contexts';

const scoreboardSchema = yup.object().shape({
  name: yup.string().required('need a name for the scoreboard bud'),
});

export const CreateTeam: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(scoreboardSchema),
  });

  // init the team context
  const teamContext = useCreateTeamContext();

  // save the team to the create team context
  const saveTeamToContext = React.useCallback(
    data => {
      teamContext.addTeam(data);
      navigation.goBack();
    },
    [navigation],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header.Root horizontalAlign="between">
        <Header.Cancel />
        <Header.Title>create team</Header.Title>
        <Header.Action onPress={handleSubmit(saveTeamToContext)}>done</Header.Action>
      </Header.Root>
      <DismissKeyboard>
        <Column padding="default" flex={1}>
          <TextInputField name="name" label="name" control={control} />
        </Column>
      </DismissKeyboard>
    </SafeAreaView>
  );
};
