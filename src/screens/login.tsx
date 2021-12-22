import React from 'react';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {View, Text} from 'react-native';

import type {RootStackParamList} from '../types/screens';

import {Column, TextInput} from '../design-system/components';
import {HeaderTitle} from '../components/HeaderTitle';

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({
  navigation,
  handleLogin,
}) => {
  return (
    <Column horizontalAlign="center" verticalAlign="center" flex={1}>
      <TextInput />
    </Column>
  );
};
