import React from 'react';

import {SafeAreaView} from 'react-native';

import {Column, Button, Row, Box, IconButton, Icon} from '../design-system';
import {HeaderTitle, Header} from '../components';
import {useAuthContext} from '../contexts';

export const ViewProfile: React.FunctionComponent = () => {
  // init auth context
  const auth = useAuthContext();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Column flex={1} verticalAlign="between" horizontalAlign="center">
        <Header.Root horizontalAlign="between">
          <Box />
          <Header.Title>adam</Header.Title>
          <Header.Exit />
        </Header.Root>
        <Button.Root onPress={() => auth.logout?.()}>
          <Button.Text>log out</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
