import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import { Login } from './pages/login';
import { Scoreboards } from './pages/scoreboards';

type RootStackParamList = {
  Login: undefined;
  Scoreboards: undefined;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Scoreboards" component={Scoreboards} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
