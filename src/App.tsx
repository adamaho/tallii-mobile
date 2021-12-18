import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Login } from './screens/login';
import { Scoreboards } from './screens/scoreboards';
import { CreateScoreboard } from './screens/create-scoreboard';
import { CreateTeam } from './screens/CreateTeam';
import { ViewScoreboard } from './screens/view-scoreboard';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = React.useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello Im Logging in</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Group>
              <Stack.Screen name="Scoreboards" component={Scoreboards} />
              <Stack.Screen name="ViewScoreboard" component={ViewScoreboard} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
              <Stack.Screen name="CreateScoreboard" component={CreateScoreboard} />
              <Stack.Screen name="CreateTeam" component={CreateTeam} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
