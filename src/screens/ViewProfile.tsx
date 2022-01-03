import React from 'react';

import {SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';

import {Column, Button, Box} from '../design-system';
import {Header} from '../components';
import {useAuthContext} from '../contexts';
import {usePlatformApi} from '../hooks';
import {me} from '../constants';

export const ViewProfile: React.FunctionComponent = () => {
  // init auth context
  const auth = useAuthContext();

  // init api
  const api = usePlatformApi();

  // // query user
  const {data: user} = useQuery(me(), () => api.getMe());

  return (
    <SafeAreaView style={{flex: 1}}>
      <Column flex={1} verticalAlign="between" horizontalAlign="center">
        <Header.Root horizontalAlign="between">
          <Box />
          <Header.Title>{user?.username || 'unknown'}</Header.Title>
          <Header.Exit />
        </Header.Root>
        <Button.Root onPress={() => auth.logout?.()}>
          <Button.Text>log out</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
