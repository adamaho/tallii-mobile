import React from 'react';

import * as Keychain from 'react-native-keychain';

import {SafeAreaView} from 'react-native';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {useMutation} from 'react-query';

import * as yup from 'yup';

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/screens';

import {Row, Column, Text, Button, Pressable} from '../design-system/components';

import {DismissKeyboard, Logo, TextInputField} from '../components';
import {useNavigation} from '@react-navigation/native';

import {usePlatformApi} from '../hooks/usePlatformApi';
import {PostLoginRequest} from '../apiClient';
import {useAuthContext} from '../contexts';

const loginSchema = yup
  .object({
    email: yup.string().email('thats not an email bud').required('enter your email bud'),
    password: yup.string().required('enter your password bud'),
  })
  .required();

interface LoginProps {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  // init auth context
  const auth = useAuthContext();

  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(loginSchema),
  });

  // init platform api
  const api = usePlatformApi();

  // init mutation
  const {mutate} = useMutation((data: PostLoginRequest) => api.postLogin(data), {
    onSuccess: async response => {
      // save the access token in secure storage
      await Keychain.setGenericPassword('accessToken', response.accessToken);

      // save the access token to context
      auth.setToken?.(response.accessToken);
    },
    onError: error => {
      // TODO throw toast notification when an error occurs
      console.warn(error);
    },
  });

  // TODO: handle the login
  const handleLogin = React.useCallback(
    data => {
      const request: PostLoginRequest = {
        loginRequestModel: data,
      };
      mutate(request);
    },
    [mutate],
  );

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <Column flex={1} paddingHorizontal="default" verticalAlign="between">
          <Column gap="large">
            <Row horizontalAlign="center" width="full">
              <Logo />
            </Row>
            <Text align="center">welcome back. lets's get you logged in bud.</Text>
            <Column gap="small">
              <TextInputField name="email" label="email" control={control} />
              <TextInputField name="password" label="password" control={control} secureTextEntry />
            </Column>
            <Button onPress={handleSubmit(handleLogin)}>login</Button>
          </Column>
          <Column horizontalAlign="center" paddingBottom="xxlarge" gap="small">
            <Text styledAs="label">don't have an account yet?</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text>create account</Text>
            </Pressable>
          </Column>
        </Column>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
