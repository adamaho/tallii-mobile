import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { View } from "react-native";

import type { RootStackParamList } from "../types/screens";

import { Primitive, TextInput } from "../design-system/components";

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({ navigation, handleLogin }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Primitive style={{ width: 100, height: 100 }} backgroundColor="widgetDefault" borderRadius="large" />
    </View>
  );
};