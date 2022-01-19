import React from 'react';

import {SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';

import {RouteProp, useRoute} from '@react-navigation/native';

import {RootStackParamList} from '../types/screens';
import {Toaster, Column, Avatar} from '../design-system';
import {Header} from '../components';
import {usePlatformApi} from '../hooks';
import {user, userScoreboards} from '../constants';

export const UserProfileScreen: React.FunctionComponent = () => {
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

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Column flex={1} verticalAlign="between">
          <Column horizontalAlign="center">
            <Header.Root>
              <Header.Back />
            </Header.Root>
            <Column horizontalAlign="center">
              <Avatar.Root size="large" backgroundColor={userInfo?.avatarBackground}>
                <Avatar.Emoji>{userInfo?.avatarEmoji}</Avatar.Emoji>
              </Avatar.Root>
              <Header.Title>{userInfo?.username || 'unknown'}</Header.Title>
            </Column>
          </Column>
        </Column>
      </SafeAreaView>
      <Toaster />
    </>
  );
};
