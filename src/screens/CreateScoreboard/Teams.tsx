import React from 'react';

import {Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Control, UseFormSetValue, useFormState} from 'react-hook-form';

import {RootStackParamList} from '../../types/screens';
import {useCreateTeamContext} from '../../contexts';
import {Text, IconButton, Row, Icon, Field, Column} from '../../design-system';
import {theme} from '../../design-system/theme';

interface TeamsProps {
  control: Control;
  setValue: UseFormSetValue<any>;
}

export const Teams: React.FunctionComponent<TeamsProps> = ({control, setValue}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the team context
  const teamContext = useCreateTeamContext();

  // init form state
  const form = useFormState({control});

  // update the form value when the teams change
  React.useEffect(() => {
    setValue('teams', teamContext.teams);
  }, [teamContext.teams]);

  console.log(form.errors);

  return (
    <Column>
      <Row horizontalAlign="between">
        <Text styledAs="label">teams</Text>
        <IconButton onPress={() => navigation.navigate('CreateTeam')}>
          <Icon.Plus color={theme.colors.background.widget.default} width={20} height={20} />
        </IconButton>
      </Row>
      {teamContext.teams.length === 0 ? (
        <Field.Root appearance={form.errors.teams == null ? undefined : 'danger'}>
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
          <Field.Message>{form?.errors?.teams?.message ?? ''}</Field.Message>
        </Field.Root>
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
  );
};
