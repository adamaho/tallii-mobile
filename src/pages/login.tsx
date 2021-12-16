import React from "react";

import { Button, View, Text } from "react-native";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FunctionComponent<LoginProps> = ({ setIsLoggedIn }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button
        title="Go to Details"
        onPress={() => setIsLoggedIn(true)}
      />
    </View>
  );
};