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
import {TeamModelToJSON} from '../apiClient';

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
            <Header.Action>save</Header.Action>
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
                <Text>❤️</Text>
                <Text>create team</Text>
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
                      <Text>{t.name}</Text>
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
