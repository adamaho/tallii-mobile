import React from "react";

import { Button, View, Text } from "react-native";

import type {Props} from "../App";

export const Scoreboards: React.FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scoreboards</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};