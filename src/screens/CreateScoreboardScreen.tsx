import React from 'react';

import * as yup from 'yup';

import {SafeAreaView, Keyboard} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList, CreateScoreboardStackParamList} from '../types/screens';

import {Control, UseFormSetValue, useFormState, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, useQueryClient} from 'react-query';

import {
  Column,
  useToastContext,
  Toaster,
  Text,
  Row,
  Pressable,
  Icon,
  IconButton,
  Field,
  Button,
  Box,
} from '../design-system';

import {theme} from '../design-system/theme';
import {DismissKeyboard, Header, ModalThumb, TextInputField} from '../components';
import {Team, useCreateTeamContext} from '../contexts';

import {CreateScoreboardRequest} from '../apiClient';

import {usePlatformApi} from '../hooks';
import {scoreboards} from '../constants';

/** ----------------------------------------------------------
 * Teams
 * -----------------------------------------------------------*/
interface TeamsProps {
  control: Control;
  setValue: UseFormSetValue<any>;
}

export const Teams: React.FunctionComponent<TeamsProps> = ({control, setValue}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<CreateScoreboardStackParamList>>();

  // init the team context
  const teamContext = useCreateTeamContext();

  // init form state
  const form = useFormState({control});

  // update the form value when the teams change
  React.useEffect(() => {
    setValue('teams', teamContext.teams);
  }, [teamContext.teams]);

  // handle add team click
  const handleAddTeamClick = React.useCallback(() => {
    Keyboard.dismiss();
    navigation.navigate('CreateTeamScreen');
  }, []);

  return (
    <Column>
      <Row horizontalAlign="between">
        <Text styledAs="label">teams</Text>
        <IconButton backgroundColor="widgetSecondary" onPress={handleAddTeamClick}>
          <Icon.Plus color={theme.colors.text.default} width={20} height={20} />
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

/** ----------------------------------------------------------
 * Create Scoreboard Screen
 * -----------------------------------------------------------*/
const scoreboardSchema = yup.object().shape({
  name: yup.string().required('need a name for the scoreboard bud'),
  game: yup.string().required('you forgot to say what game it is'),
  teams: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string(),
      }),
    )
    .min(1, "it's no fun without teams")
    .required("it's no fun without teams"),
});

export const CreateScoreboardScreen: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init toast context
  const toastContext = useToastContext();

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
      navigation.navigate('ViewHomeScreen');
    },
    onError: () => {
      toastContext.addToast({label: "we couldn't create the scoreboard."});
    },
  });

  // handle submitting the scoreboard
  const saveScoreboard = React.useCallback((data: {name: string; game: string; teams: Team[]}) => {
    const request: CreateScoreboardRequest = {
      createScoreboardRequestModel: {
        ...data,
        teams: data.teams.map(t => ({
          name: t.name,
        })),
      },
    };

    mutate(request);
  }, []);

  // clear the teams from context when the component unmounts
  React.useEffect(() => {
    return () => {
      teamContext.clearTeams();
    };
  }, []);

  return (
    <>
      <DismissKeyboard>
        <SafeAreaView style={{height: '100%', flex: 1}}>
          <ModalThumb />
          <Header.Root horizontalAlign="right">
            <Header.Exit />
          </Header.Root>
          <Header.Root>
            <Header.Title>create scoreboard</Header.Title>
          </Header.Root>
          <Column padding="default" flex={1}>
            <Box>
              <TextInputField
                placeholder="my scoreboard"
                name="name"
                label="name"
                control={control}
                autoCapitalize="none"
              />
              <TextInputField
                placeholder="euchure"
                name="game"
                label="game"
                control={control}
                autoCapitalize="none"
              />
              <Teams control={control} setValue={setValue} />
            </Box>
            <Button.Root onPress={handleSubmit(saveScoreboard)}>
              <Button.Text>create scoreboard</Button.Text>
            </Button.Root>
          </Column>
        </SafeAreaView>
      </DismissKeyboard>
      <Toaster />
    </>
  );
};
