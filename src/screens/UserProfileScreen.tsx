import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import {useQuery} from 'react-query';

import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';
import {Toaster, Column, Avatar, Heading, Row, Text, Pressable} from '../design-system';
import {Header, GradientHeading} from '../components';
import {usePlatformApi} from '../hooks';
import {user, userScoreboards} from '../constants';

export const UserProfileScreen: React.FunctionComponent = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'UserProfile'>>();

  // init api
  const api = usePlatformApi();

  // init query to fetch user info
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery(user(route.params.userId), () => api.getUser({userId: route.params.userId}));

  // init query to fetch scoreboards for a user
  const {
    data: scoreboards,
    isLoading: isLoadingScorebaords,
    isError: isErrorScoreboards,
  } = useQuery(userScoreboards(route.params.userId), () =>
    api.getUserScoreboards({userId: route.params.userId}),
  );

  // init scoreboard content
  const scoreboardContent = React.useMemo(() => {
    // if (isLoading) {

    // }

    // if (isError) {

    // }

    // if (scoreboards && scoreboards.length === 0) {

    // }

    return (
      <Column>
        {scoreboards?.map((s, i) => {
          return (
            <Pressable
              key={i}
              disableHaptics
              onPress={() => navigation.navigate('ViewScoreboard', {scoreboardId: s.scoreboardId})}
            >
              <Row backgroundColor="widgetSecondary" borderRadius="default" padding="default">
                <Column gap="none">
                  <Heading level="4">{s.name}</Heading>
                  <Text styledAs="caption" textColor="secondary">
                    {s.game} {'\u00B7'} {s.teams.length} teams
                  </Text>
                </Column>
              </Row>
            </Pressable>
          );
        })}
      </Column>
    );
  }, [isLoadingScorebaords, isErrorScoreboards, scoreboards]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Column flex={1} gap="large">
          <Column horizontalAlign="center">
            <Header.Root>
              <Header.Back />
            </Header.Root>
            <Column horizontalAlign="center">
              <Avatar.Root size="large" backgroundColor={userInfo?.avatarBackground}>
                <Avatar.Emoji>{userInfo?.avatarEmoji}</Avatar.Emoji>
              </Avatar.Root>
              <Heading>{userInfo?.username || 'unknown'}</Heading>
            </Column>
          </Column>
          <Column paddingHorizontal="default">
            <Row>
              <GradientHeading>scoreboards</GradientHeading>
            </Row>
            <ScrollView>{scoreboardContent}</ScrollView>
          </Column>
        </Column>
      </SafeAreaView>
      <Toaster />
    </>
  );
};
