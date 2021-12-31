import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useMutation, useQuery, useQueryClient} from 'react-query';

import {useRoute, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types/screens';

import {Modal, useModalContext, Button, Column, Row, Text, Heading} from '../../design-system';

import {Team} from './Team';
import {scoreboards} from '../../constants';
import {usePlatformApi} from '../../hooks';
import {formatDate} from '../../utils';
import {Header} from '../../components';
import {DeleteScoreboardRequest} from '../../apiClient';

/** ----------------------------------------------------------
 * ViewScoreboard Header
 * -----------------------------------------------------------*/
const ViewScoreboardHeader: React.FunctionComponent = () => {
  // set is visible
  const {setIsVisible} = useModalContext();

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'ViewScoreboard'>>();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init query client
  const queryClient = useQueryClient();

  // init api
  const api = usePlatformApi();

  // init mutation to delete the scoreboard
  const {mutate} = useMutation((data: DeleteScoreboardRequest) => api.deleteScoreboard(data), {
    onSuccess: () => {
      // invalidate scoreboards
      queryClient.invalidateQueries(scoreboards());

      // go back
      navigation.goBack();
    },
    onError: error => {
      // TODO handle error
      console.log(error);
    },
  });

  // handle the delete press
  const handleDelete = React.useCallback(() => {
    const request: DeleteScoreboardRequest = {
      scoreboardId: route.params.scoreboardId,
    };

    mutate(request);
  }, []);

  return (
    <>
      <Header.Root horizontalAlign="between">
        <Header.Back />
        <Modal.TextTrigger>delete</Modal.TextTrigger>
      </Header.Root>
      <Modal.Root>
        <Column>
          <Button.Root appearance="danger" onPress={handleDelete}>
            <Button.Text>delete</Button.Text>
          </Button.Root>
          <Button.Root onPress={() => setIsVisible(false)}>
            <Button.Text>cancel</Button.Text>
          </Button.Root>
        </Column>
      </Modal.Root>
    </>
  );
};

export const ViewScoreboard: React.FunctionComponent = () => {
  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'ViewScoreboard'>>();

  // init api
  const api = usePlatformApi();

  // query for the specific scoreboard based on the scoreboard id
  const {data: scoreboard} = useQuery(scoreboards(route.params.scoreboardId), () =>
    api.getScoreboard({
      scoreboardId: route.params.scoreboardId,
    }),
  );

  // format the date
  const formattedDate = React.useMemo(() => {
    if (scoreboard) {
      return formatDate(scoreboard.createdAt);
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
    <SafeAreaView style={{flex: 1}}>
      <Column>
        <Modal.Context>
          <ViewScoreboardHeader />
        </Modal.Context>
        <Row padding="default" horizontalAlign="between" verticalAlign="top">
          <Column gap="xsmall">
            <Heading numberOfLines={1}>{scoreboard?.name}</Heading>
            <Text>{scoreboard?.game}</Text>
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
                />
              );
            })}
          </Column>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
