import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import {useQuery} from 'react-query';

import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {RootStackParamList} from '../types/screens';
import {Toaster, Column, Avatar, Heading, Row, Text, Pressable, Icon} from '../design-system';
import {Header, GradientHeading} from '../components';
import {theme} from '../design-system/theme';
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
    isLoading: isLoadingScoreboards,
    isError: isErrorScoreboards,
  } = useQuery(userScoreboards(route.params.userId), () =>
    api.getUserScoreboards({userId: route.params.userId}),
  );

  // init scoreboard content
  const scoreboardContent = React.useMemo(() => {
    if (isLoadingScoreboards) {
      return (
        <ContentLoader
          width={'100%'}
          height={75}
          viewBox="0 0 360 75"
          backgroundColor={theme.colors.background.widget.secondary}
          foregroundColor={theme.colors.background.widget.highlight}
        >
          <Rect x="0" y="0" rx="16" ry="16" width="100%" height="75" />
        </ContentLoader>
      );
    }

    if (isErrorScoreboards) {
      return (
        <Column
          horizontalAlign="center"
          gap="small"
          backgroundColor="widgetSecondary"
          padding="default"
          borderRadius="large"
        >
          <Icon.ExclamationTriangle height={40} width={40} color="default" />
          <Text align="center">something went wrong when we were trying to get scoreboards</Text>
        </Column>
      );
    }

    if (scoreboards && scoreboards.length === 0) {
      return (
        <Column
          horizontalAlign="center"
          gap="small"
          backgroundColor="widgetSecondary"
          padding="default"
          borderRadius="large"
        >
          <Heading align="center">🌴</Heading>
          <Text align="center" styledAs="caption">
            no scoreboards
          </Text>
        </Column>
      );
    }

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
  }, [isLoadingScoreboards, isErrorScoreboards, scoreboards]);

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
          <Column paddingHorizontal="default" height="full">
            <Row>
              <GradientHeading>scoreboards</GradientHeading>
            </Row>
            <ScrollView style={{height: '100%'}}>{scoreboardContent}</ScrollView>
          </Column>
        </Column>
      </SafeAreaView>
      <Toaster />
    </>
  );
};
