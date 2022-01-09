import React from 'react';

import {SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';

import {Column, Button, Row, Heading} from '../design-system';
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
      <Column flex={1} horizontalAlign="center">
        <Header.Root horizontalAlign="right">
          <Header.Exit />
        </Header.Root>
        <Column>
          <Heading>{user?.username || 'unknown'}</Heading>
        </Column>
        <Button.Root onPress={() => auth.logout?.()}>
          <Button.Text>log out</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
