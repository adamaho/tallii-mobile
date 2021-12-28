import React from 'react';

import {SafeAreaView, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/screens';

import {DismissKeyboard, Header} from '../../components';
import {Box, Heading, Column, Button, TextButton} from '../../design-system';
// import { atoms } from "../../design-system/atoms";
import {theme} from '../../design-system/theme';

export const ViewTeam: React.FunctionComponent = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    return () => {
      console.log('unmount');
      // save the score before the component unmounts.
    };
  }, []);

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Header.Root horizontalAlign="right">
          <Header.Exit />
        </Header.Root>
        <Column padding="default" gap="xxxlarge">
          <Heading align="center">hill beavers</Heading>
          <Column gap="large">
            <Box
              backgroundColor="widgetSecondary"
              padding="xlarge"
              borderRadius="large"
              width="full"
            >
              <TextInput
                defaultValue="12"
                style={{
                  textAlign: 'center',
                  fontFamily: 'Nunito-Black',
                  fontSize: 64,
                  color: theme.colors.text.default,
                  minWidth: 100,
                  width: '100%',
                }}
                keyboardType="number-pad"
              />
            </Box>
            <Button.Root>
              <Button.Text>save</Button.Text>
            </Button.Root>
          </Column>
        </Column>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
