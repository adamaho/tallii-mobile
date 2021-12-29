import React from 'react';

import * as yup from 'yup';

import {SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Row, Box, Column, IconButton, Text} from '../design-system';
import {DismissKeyboard, Header, TextInputField} from '../components';

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

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Header.Root horizontalAlign="between">
          <Box />
          <Header.Title>create scoreboard</Header.Title>
          {/* TODO: fix this */}
          <Header.Exit />
        </Header.Root>
        <Column padding="default">
          <TextInputField name="name" label="name" control={control} />
          <TextInputField name="game" label="game" control={control} />
          <Row horizontalAlign="between">
            <Text styledAs="label">teams</Text>
            <IconButton onPress={() => navigation.navigate('CreateTeam')}>
              <Text>a</Text>
            </IconButton>
          </Row>
          <Column
            gap="small"
            style={{height: 100}}
            horizontalAlign="center"
            verticalAlign="center"
            backgroundColor="widgetSecondary"
            borderRadius="default"
          >
            <Text>❤️</Text>
            <Text>create team</Text>
          </Column>
        </Column>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
