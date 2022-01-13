import React from 'react';

import * as Keychain from 'react-native-keychain';
import * as yup from 'yup';

import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';

import {
  Row,
  Column,
  Text,
  Button,
  Pressable,
  useToastContext,
  Toaster,
} from '../design-system/components';

import type {RootStackParamList} from '../types/screens';
import {DismissKeyboard, Logo, TextInputField} from '../components';
import {usePlatformApi} from '../hooks';
import {PostSignupRequest} from '../apiClient';
import {useAuthContext} from '../contexts';
import {theme} from '../design-system/theme';

const signupSchema = yup
  .object({
    email: yup.string().email('thats not an email bud').required('enter your email bud'),
    username: yup
      .string()
      .min(3, 'your username must be at least 3 characters long')
      .required('enter your username bud'),
    password: yup
      .string()
      .min(6, 'your password must be at least 6 characters long')
      .required('enter your password bud'),
  })
  .required();

interface SignupProps {
  handleLogin: () => void;
}

export const Signup: React.FunctionComponent<SignupProps> = () => {
  // init navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(signupSchema),
  });

  // init auth context
  const auth = useAuthContext();

  // init toast context
  const toastContext = useToastContext();

  // init api
  const api = usePlatformApi();

  // init mutation to sign the user up
  const {mutate, isLoading} = useMutation((data: PostSignupRequest) => api.postSignup(data), {
    onSuccess: async response => {
      // save the access token in secure storage
      await Keychain.setGenericPassword('accessToken', response.accessToken);

      // save the access token to context
      auth.authorize?.(response.accessToken);

      // save the user info to context
      auth.setUser?.(response.user);
    },
    onError: error => {
      toastContext.addToast({label: 'seems someone might have taken your email.'});
    },
  });

  // handle signup
  const handleSignup = React.useCallback(data => {
    const request: PostSignupRequest = {
      signupRequestModel: data,
    };

    mutate(request);
  }, []);

  return (
    <>
      <DismissKeyboard>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <Column flex={1} paddingHorizontal="default" verticalAlign="between">
              <Column gap="large">
                <Row horizontalAlign="center" width="full">
                  <Logo />
                </Row>
                <Text align="center">welcome. let's get you signed up bud.</Text>
                <Column gap="small">
                  <TextInputField
                    name="email"
                    label="email"
                    control={control}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <TextInputField
                    name="username"
                    label="username"
                    control={control}
                    autoCapitalize="none"
                  />
                  <TextInputField
                    name="password"
                    label="password"
                    control={control}
                    secureTextEntry
                  />
                </Column>
                <Button.Root onPress={handleSubmit(handleSignup)}>
                  {isLoading ? (
                    <Button.Icon>
                      <ActivityIndicator color={theme.colors.text.onAction} />
                    </Button.Icon>
                  ) : (
                    <Button.Text>sign up</Button.Text>
                  )}
                </Button.Root>
              </Column>
              <Column horizontalAlign="center" paddingBottom="xxlarge" gap="small">
                <Text styledAs="label">already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text>log in</Text>
                </Pressable>
              </Column>
            </Column>
          </ScrollView>
        </SafeAreaView>
      </DismissKeyboard>
      <Toaster />
    </>
  );
};
