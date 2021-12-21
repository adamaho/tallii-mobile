import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { View, Text } from "react-native";

import type { RootStackParamList } from "../types/screens";

import { Box } from "../design-system/components";

interface LoginProps extends NativeStackScreenProps<RootStackParamList> {
  handleLogin: () => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({ navigation, handleLogin }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Box backgroundColor="brandDefault" borderRadius="large" padding="large">
        <Text style={{ fontFamily: "Nunito-Bold", color: "red", fontSize: 48 }}>Hello World</Text>
      </Box>
    </View>
  );
};