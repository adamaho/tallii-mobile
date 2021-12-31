import React from 'react';

import {useQuery} from 'react-query';

import getUnixTime from 'date-fns/getUnixTime';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {RootStackParamList} from '../types/screens';

import {DismissKeyboard, HeaderTitle, Scoreboard} from '../components';

import {Text, IconButton, Column, Row, Icon, Button} from '../design-system';

import {theme} from '../design-system/theme';
import {scoreboards} from '../constants';
import {usePlatformApi} from '../hooks';

export const Scoreboards: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init api
  const api = usePlatformApi();

  // fetch all of the scoreboards
  const {
    data: myScoreboards,
    isLoading,
    refetch,
  } = useQuery(scoreboards(), () => api.getMyScoreboards(), {
    onError: () => {
      // TODO: show toast notification
    },
  });

  // sort the scoreboards by createdAt date
  const sortedScoreboards = React.useMemo(() => {
    if (myScoreboards) {
      return [...myScoreboards]?.sort(
        (a, b) => getUnixTime(b.createdAt) - getUnixTime(a.createdAt),
      );
    }

    return [];
  }, [myScoreboards]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Column>
          <Row
            horizontalAlign="between"
            paddingHorizontal="default"
            verticalAlign="center"
            paddingVertical="default"
          >
            <IconButton
              backgroundColor="accentOrangeDefault"
              onPress={() => navigation.navigate('ViewProfile')}
            >
              <Text>🐺</Text>
            </IconButton>
            <HeaderTitle>scoreboards</HeaderTitle>
            <IconButton onPress={() => navigation.navigate('CreateScoreboard')}>
              <Icon.Plus color={theme.colors.background.widget.default} width={20} height={20} />
            </IconButton>
          </Row>
          {/* TODO: Add support for this at a later date */}
          {/* <Box
            paddingHorizontal="default"
            backgroundColor="widgetDefault"
            paddingVertical="default"
          >
            <TextInput placeholder="search" />
          </Box> */}
        </Column>
        {sortedScoreboards.length === 0 ? (
          <Column flex={1} paddingTop="large" paddingHorizontal="default">
            <Column
              gap="small"
              horizontalAlign="center"
              backgroundColor="widgetSecondary"
              padding="xlarge"
              borderRadius="default"
            >
              <Text>🕹</Text>
              <Text>no scoreboards</Text>
            </Column>
          </Column>
        ) : (
          <ScrollView
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          >
            <Column paddingHorizontal="default" paddingTop="default">
              {sortedScoreboards?.map(s => {
                return (
                  <Scoreboard
                    key={s.scoreboardId}
                    scoreboardId={s.scoreboardId}
                    name={s.name}
                    game={s.game}
                    createdAt={s.createdAt}
                    teams={s.teams}
                  />
                );
              })}
            </Column>
          </ScrollView>
        )}
      </SafeAreaView>
    </DismissKeyboard>
  );
};
