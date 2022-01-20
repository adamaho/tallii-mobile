import React from 'react';

import {useQuery} from 'react-query';
import ContentLoader, {Rect} from 'react-content-loader/native';

import getUnixTime from 'date-fns/getUnixTime';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';

import {RootStackParamList} from '../types/screens';
import {DismissKeyboard, Header, Scoreboard} from '../components';

import {Text, IconButton, Column, Icon, Avatar, Row} from '../design-system';

import {theme} from '../design-system/theme';
import {scoreboards, me} from '../constants';
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
    isError,
    refetch,
  } = useQuery(scoreboards(), () => api.getMyScoreboards());

  // fetch the current user
  const {data: user} = useQuery(me(), () => api.getMe());

  // sort the scoreboards by updatedAt date
  const sortedScoreboards = React.useMemo(() => {
    if (myScoreboards) {
      return [...myScoreboards]?.sort(
        (a, b) => getUnixTime(b.updatedAt) - getUnixTime(a.updatedAt),
      );
    }

    return [];
  }, [myScoreboards]);

  const list = React.useMemo(() => {
    if (isLoading) {
      return (
        <Column width="full" paddingHorizontal="default" verticalAlign="top">
          <ContentLoader
            width="100%"
            height={450}
            viewBox="0 0 400 500"
            backgroundColor={theme.colors.background.widget.secondary}
            foregroundColor={theme.colors.background.widget.highlight}
          >
            <Rect x="0" y="16" rx="16" ry="16" width="100%" height="150" />
            <Rect x="0" y="182" rx="16" ry="16" width="100%" height="150" />
            <Rect x="0" y="348" rx="16" ry="16" width="100%" height="150" />
          </ContentLoader>
        </Column>
      );
    }

    if (isError) {
      return (
        <Column flex={1} horizontalAlign="center" padding="default">
          <Column
            gap="small"
            backgroundColor="widgetSecondary"
            horizontalAlign="center"
            width="full"
            padding="default"
            borderRadius="default"
          >
            <Icon.ExclamationTriangle height={40} width={40} color="default" />
            <Text align="center">
              well bud, seems we can't get your scoreboards. check back in later.
            </Text>
          </Column>
        </Column>
      );
    }

    if (myScoreboards?.length === 0) {
      return (
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
      );
    }

    return (
      <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
        <Column paddingHorizontal="default" paddingTop="default">
          {sortedScoreboards?.map(s => {
            return (
              <Scoreboard
                key={s.scoreboardId}
                scoreboardId={s.scoreboardId}
                name={s.name}
                game={s.game}
                updatedAt={s.updatedAt}
                teams={s.teams}
              />
            );
          })}
        </Column>
      </ScrollView>
    );
  }, [isLoading, isError, sortedScoreboards]);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Column>
          <Header.Root horizontalAlign="between">
            <Row verticalAlign="center">
              <Header.Title>scoreboards</Header.Title>
            </Row>
            <Row gap="default">
              <IconButton
                onPress={() => navigation.navigate('SearchScreen')}
                backgroundColor="widgetSecondary"
              >
                <Icon.Search color="default" width={20} height={20} />
              </IconButton>
              <IconButton
                onPress={() => navigation.navigate('CreateScoreboard')}
                backgroundColor="widgetSecondary"
              >
                <Icon.Plus color={theme.colors.text.default} width={20} height={20} />
              </IconButton>
              <Avatar.Root
                size="small"
                onPress={() => navigation.navigate('MyProfile', {})}
                backgroundColor={user?.avatarBackground}
              >
                <Avatar.Emoji>{user?.avatarEmoji}</Avatar.Emoji>
              </Avatar.Root>
            </Row>
          </Header.Root>
        </Column>
        {list}
      </SafeAreaView>
    </DismissKeyboard>
  );
};
