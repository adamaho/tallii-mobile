import React from 'react';
import {SafeAreaView} from 'react-native';

import {Button, Column, useToastContext} from '../design-system';

export const Playground: React.FunctionComponent = () => {
  const toastContext = useToastContext();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Column verticalAlign="center" horizontalAlign="center" flex={1}>
        <Button.Root onPress={() => toastContext.addToast({label: 'something'})}>
          <Button.Text>show toast</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
