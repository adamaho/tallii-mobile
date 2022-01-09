import React from 'react';

import {SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';

import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {Column, Button, Box, Heading, Avatar} from '../design-system';
import {theme} from '../design-system/theme';
import {Header} from '../components';
import {useAuthContext} from '../contexts';
import {usePlatformApi} from '../hooks';
import {me} from '../constants';

export const ViewProfile: React.FunctionComponent = () => {
  // init auth context
  const auth = useAuthContext();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init api
  const api = usePlatformApi();

  // query user
  const {data: user} = useQuery(me(), () => api.getMe());

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'ViewProfile'>>();

  // handle editing the avatar
  const handleAvatarPress = React.useCallback(() => {
    navigation.navigate('EditAvatar', {
      backgroundColor: theme.colors.background.accent.orange.secondary,
      emoji: 'A',
      returnTo: 'ViewProfile',
    });
  }, []);

  React.useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Column flex={1} verticalAlign="between" padding="default">
        <Column horizontalAlign="center">
          <Header.Root horizontalAlign="right">
            <Header.Exit />
          </Header.Root>
          <Column>
            <Avatar.Root
              size="large"
              backgroundColor={
                route.params?.backgroundColor ?? theme.colors.background.accent.orange.secondary
              }
              onPress={handleAvatarPress}
            >
              <Avatar.Emoji>{route.params?.emoji ?? 'A'}</Avatar.Emoji>
            </Avatar.Root>
            <Heading align="center">{user?.username || 'unknown'}</Heading>
          </Column>
        </Column>
        <Button.Root onPress={() => auth.logout?.()}>
          <Button.Text>log out</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
