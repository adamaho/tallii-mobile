import React from 'react';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/screens';

import {
  Field,
  Row,
  Column,
  TextInput,
  Text,
  Button,
} from '../design-system/components';

import {DismissKeyboard, Logo} from '../components';

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({
  navigation,
  handleLogin,
}) => {
  return (
    <DismissKeyboard>
      <Column
        flex={1}
        paddingTop="xxxlarge"
        paddingHorizontal="default"
        gap="large"
      >
        <Row horizontalAlign="center" width="full">
          <Logo />
        </Row>
        <Text align="center">welcome back. let's get you logged in.</Text>
        <Column gap="small">
          <Field.Root>
            <Field.Label>email</Field.Label>
            <TextInput />
            <Field.Message>
              sorry demmy, you forgot to add your email.
            </Field.Message>
          </Field.Root>
          <Field.Root>
            <Field.Label>password</Field.Label>
            <TextInput secureTextEntry />
            <Field.Message>yeah we need your password bud.</Field.Message>
          </Field.Root>
        </Column>
        <Button>login</Button>
      </Column>
    </DismissKeyboard>
  );
};
