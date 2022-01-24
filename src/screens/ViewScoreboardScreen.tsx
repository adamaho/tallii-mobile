import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useMutation, useQuery, useQueryClient} from 'react-query';

import {useRoute, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import {RootStackParamList, ScoreboardStackParamList} from '../types/screens';

import {
  Modal,
  useModalContext,
  Button,
  Column,
  Row,
  Text,
  Heading,
  useToastContext,
  Toaster,
  Pressable,
} from '../design-system';

import {scoreboards} from '../constants';
import {usePlatformApi} from '../hooks';
import {formatDate} from '../utils';
import {Header, ModalThumb} from '../components';
import {DeleteScoreboardRequest} from '../apiClient';
import {useAuthContext} from '../contexts';

/** ----------------------------------------------------------
 * ViewScoreboard Team
 * -----------------------------------------------------------*/
interface TeamProps {
  name: string;
  score: number;
  teamId: number;
  scoreboardId: number;
  isCreator: boolean;
}

export const Team: React.FunctionComponent<TeamProps> = ({
  name,
  score,
  scoreboardId,
  teamId,
  isCreator,
}) => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<ScoreboardStackParamList>>();

  return (
    <Pressable
      isDisabled={!isCreator}
      onPress={() => navigation.navigate('ViewTeamScreen', {teamId, scoreboardId})}
    >
      <Row
        horizontalAlign="between"
        backgroundColor="widgetSecondary"
        padding="default"
        borderRadius="default"
      >
        <Text numberOfLines={1} style={{flex: 0.9}}>
          {name}
        </Text>
        <Heading>{score}</Heading>
      </Row>
    </Pressable>
  );
};

/** ----------------------------------------------------------
 * ViewScoreboard Header
 * -----------------------------------------------------------*/
interface ViewScoreboardHeaderProps {
  isCreator?: boolean;
}

const ViewScoreboardHeader: React.FunctionComponent<ViewScoreboardHeaderProps> = ({isCreator}) => {
  // set is visible
  const {setIsVisible} = useModalContext();

  // init toast context
  const toastContext = useToastContext();

  // init route to get the params
  const route = useRoute<RouteProp<ScoreboardStackParamList, 'ViewScoreboardScreen'>>();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<ScoreboardStackParamList>>();

  // init query client
  const queryClient = useQueryClient();

  // init api
  const api = usePlatformApi();

  // init mutation to delete the scoreboard
  const {mutate} = useMutation((data: DeleteScoreboardRequest) => api.deleteScoreboard(data), {
    onSuccess: () => {
      // go back
      navigation.goBack();

      // invalidate scoreboards
      queryClient.invalidateQueries(scoreboards(), {exact: true});
    },
    onError: error => {
      toastContext.addToast({label: "we couldn't delete the scoreboard"});
    },
  });

  // handle the delete press
  const handleDelete = React.useCallback(() => {
    const request: DeleteScoreboardRequest = {
      scoreboardId: route.params.scoreboardId,
    };

    mutate(request);
  }, []);

  // calculate which view stack the scoreboard is a part of
  const isScoreboardStack = navigation.getState().routes.length <= 2;

  return (
    <>
      <ModalThumb />
      <Header.Root horizontalAlign={!isScoreboardStack ? 'between' : 'right'}>
        {!isScoreboardStack && <Header.Back />}
        {isCreator && <Modal.TextTrigger>delete</Modal.TextTrigger>}
      </Header.Root>
      <Modal.Root>
        <Column>
          <Column gap="xsmall">
            <Heading>delete scoreboard</Heading>
            <Text>are you sure you want to delete this scoreboard?</Text>
          </Column>
          <Button.Root variant="primary" appearance="danger" onPress={handleDelete}>
            <Button.Text>delete</Button.Text>
          </Button.Root>
          <Button.Root variant="primary" onPress={() => setIsVisible(false)}>
            <Button.Text>cancel</Button.Text>
          </Button.Root>
        </Column>
      </Modal.Root>
    </>
  );
};

export const ViewScoreboardScreen: React.FunctionComponent = () => {
  // init route to get the params
  const route = useRoute<RouteProp<ScoreboardStackParamList, 'ViewScoreboardScreen'>>();

  // init auth context
  const auth = useAuthContext();

  // init api
  const api = usePlatformApi();

  // query for the specific scoreboard based on the scoreboard id
  const {data: scoreboard} = useQuery(scoreboards(route.params.scoreboardId), () =>
    api.getScoreboard({
      scoreboardId: route.params.scoreboardId,
    }),
  );

  // determine if the current user made the scoreboard
  const isCreator = React.useMemo(() => {
    return scoreboard?.createdBy.userId === auth.user?.userId;
  }, [scoreboard, auth]);

  // format the date
  const formattedDate = React.useMemo(() => {
    if (scoreboard) {
      return formatDate(scoreboard.updatedAt);
    }
  }, [scoreboard]);

  // sort the teams by score
  const sortedTeams = React.useMemo(() => {
    if (scoreboard) {
      return [...scoreboard.teams].sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        } else if (a.score < b.score) {
          return 1;
        }

        return 0;
      });
    }

    return [];
  }, [scoreboard]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Column>
          <Modal.Context>
            <ViewScoreboardHeader isCreator={isCreator} />
          </Modal.Context>
          <Row padding="default" horizontalAlign="between" verticalAlign="top">
            <Column gap="xsmall">
              <Heading numberOfLines={1}>{scoreboard?.name}</Heading>
              <Text numberOfLines={1}>{scoreboard?.game}</Text>
              <Text styledAs="caption">{formattedDate}</Text>
            </Column>
          </Row>
        </Column>
        <ScrollView style={{flex: 1}}>
          {sortedTeams && scoreboard && (
            <Column padding="default">
              {sortedTeams.map((t, i) => {
                return (
                  <Team
                    key={t.teamId}
                    teamId={t.teamId}
                    scoreboardId={scoreboard?.scoreboardId}
                    name={t.name}
                    score={t.score}
                    isCreator={isCreator}
                  />
                );
              })}
            </Column>
          )}
        </ScrollView>
      </SafeAreaView>
      <Toaster />
    </>
  );
};
