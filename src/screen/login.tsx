import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button, View, Text } from "react-native";

import type { RootStackParamList } from "../types/screens";

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({ navigation, handleLogin }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Login</Text>
      <Button
        title="Click to login"
        onPress={() => handleLogin()}
      />
    </View>
  );
};