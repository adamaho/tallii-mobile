import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet, Text, View} from 'react-native';

import {theme} from './design-system/theme';

import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {Scoreboards} from './screens/Scoreboards';
import {CreateScoreboard} from './screens/CreateScoreboard';
import {CreateTeam} from './screens/CreateTeam';
import {ViewScoreboard} from './screens/ViewScoreboard/ViewScoreboard';
import {ViewTeam} from './screens/ViewTeam/ViewTeam';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hello Im Logging in</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background.widget.default,
            card: theme.colors.background.widget.default,
            text: theme.colors.text.default,
            border: theme.colors.border.default,
          },
        }}
      >
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login">
                {props => <Login {...props} handleLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {props => <Signup {...props} handleLogin={handleLogin} />}
              </Stack.Screen>
            </Stack.Group>
          ) : (
            <>
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="scoreboards" component={Scoreboards} />
                <Stack.Screen name="ViewScoreboard" component={ViewScoreboard} />
              </Stack.Group>
              <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
                <Stack.Screen name="CreateScoreboard" component={CreateScoreboard} />
                <Stack.Screen name="CreateTeam" component={CreateTeam} />
                <Stack.Screen name="ViewTeam" component={ViewTeam} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
