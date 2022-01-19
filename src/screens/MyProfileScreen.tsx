import React from 'react';

import {SafeAreaView} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/screens';

import {Column, Box, Button, Heading, Avatar, Toaster, useToastContext} from '../design-system';
import {UpdateMeRequest} from '../apiClient';
import {theme} from '../design-system/theme';
import {Header} from '../components';
import {useAuthContext} from '../contexts';
import {usePlatformApi} from '../hooks';
import {me} from '../constants';

export const MyProfileScreen: React.FunctionComponent = () => {
  // init auth context
  const auth = useAuthContext();

  // init toast context
  const toastContext = useToastContext();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init api
  const api = usePlatformApi();

  // init the query client
  const queryClient = useQueryClient();

  // query user
  const {data: user} = useQuery(me(), () => api.getMe());

  // init mutation to update the user
  const {mutate} = useMutation((data: UpdateMeRequest) => api.updateMe(data), {
    onSuccess: response => {
      // update the cache of the currently logged in user
      queryClient.setQueryData(me(), response);
    },
    onError: () => {
      toastContext.addToast({label: "we couldn't update your avatar"});
    },
  });

  // init route to get the params
  const route = useRoute<RouteProp<RootStackParamList, 'MyProfile'>>();

  // handle editing the avatar
  const handleAvatarPress = React.useCallback(() => {
    navigation.navigate('EditAvatar', {
      backgroundColor: user?.avatarBackground ?? theme.colors.background.accent.orange.secondary,
      emoji: user?.avatarEmoji ?? '🍕',
      returnTo: 'ViewProfile',
    });
  }, [user]);

  // save the changes to the avatar
  React.useEffect(() => {
    if (route.params == null) {
      return;
    }

    const {backgroundColor, emoji} = route.params;

    if (user && backgroundColor && emoji) {
      const request: UpdateMeRequest = {
        updateUserRequestModel: {
          username: user.username,
          avatarBackground: backgroundColor,
          avatarEmoji: emoji,
        },
      };

      mutate(request);
    }
  }, [route.params, user]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Column flex={1} verticalAlign="between">
          <Column horizontalAlign="center">
            <Header.Root>
              <Header.Back />
            </Header.Root>
            <Column horizontalAlign="center">
              <Avatar.Root
                size="large"
                backgroundColor={user?.avatarBackground}
                onPress={handleAvatarPress}
              >
                <Avatar.Emoji>{user?.avatarEmoji}</Avatar.Emoji>
              </Avatar.Root>
              <Header.Title>{user?.username || 'unknown'}</Header.Title>
            </Column>
          </Column>
          <Box padding="default">
            <Button.Root onPress={() => auth.logout?.()}>
              <Button.Text>log out</Button.Text>
            </Button.Root>
          </Box>
        </Column>
      </SafeAreaView>
      <Toaster />
    </>
  );
};
