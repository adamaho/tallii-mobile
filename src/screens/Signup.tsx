import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup';

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/screens';

import {
  Row,
  Column,
  Text,
  Button,
  Pressable,
} from '../design-system/components';

import {DismissKeyboard, Logo, TextInputField} from '../components';
import {useNavigation} from '@react-navigation/native';

const signupSchema = yup
  .object({
    email: yup
      .string()
      .email('thats not an email bud')
      .required('enter your email bud'),
    username: yup
      .string()
      .length(3, 'your username must be at least 3 characters long')
      .required('enter your username bud'),
    password: yup.string().required('enter your password bud'),
  })
  .required();

interface SignupProps {
  handleLogin: () => void;
}

export const Signup: React.FunctionComponent<SignupProps> = () => {
  // init navigation
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // init the form
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(signupSchema),
  });

  // TODO: handle the signup
  const handleSignup = React.useCallback(data => {
    console.log(data);
  }, []);

  return (
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
                />
                <TextInputField
                  name="username"
                  label="username"
                  control={control}
                />
                <TextInputField
                  name="password"
                  label="password"
                  control={control}
                  secureTextEntry
                />
              </Column>
              <Button onPress={handleSubmit(handleSignup)}>sign up</Button>
            </Column>
            <Column
              horizontalAlign="center"
              paddingBottom="xxlarge"
              gap="small"
            >
              <Text styledAs="label">already have an account?</Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>log in</Text>
              </Pressable>
            </Column>
          </Column>
        </ScrollView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};
