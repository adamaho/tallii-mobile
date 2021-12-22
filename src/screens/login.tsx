import React from 'react';

import {Button} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/screens';

import {
  Field,
  Heading,
  Row,
  Column,
  TextInput,
  Text,
} from '../design-system/components';
import {Logo} from '../components';

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({
  navigation,
  handleLogin,
}) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <Column
      flex={1}
      paddingTop="xxxlarge"
      paddingHorizontal="default"
      gap="large"
    >
      <Row horizontalAlign="center" width="full">
        <Logo />
      </Row>
      <Column>
        <Button title="toggle" onPress={() => setToggle(current => !current)} />
        <Field.Root appearance={toggle ? 'danger' : undefined}>
          <Field.Label>email</Field.Label>
          <TextInput />
          <Field.Message>please provide an email</Field.Message>
        </Field.Root>
      </Column>
    </Column>
  );
};
