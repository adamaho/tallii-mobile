import React from 'react';

import * as Keychain from 'react-native-keychain';

import {QueryClient, QueryClientProvider} from 'react-query';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {theme} from './design-system/theme';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {Scoreboards} from './screens/Scoreboards';
import {CreateScoreboard} from './screens/CreateScoreboard';
import {CreateTeam} from './screens/CreateTeam';
import {ViewScoreboard} from './screens/ViewScoreboard/ViewScoreboard';
import {ViewTeam} from './screens/ViewTeam/ViewTeam';
import {AuthContextProvider, useAuthContext} from './contexts';
import {Column, Text} from './design-system';

const Stack = createNativeStackNavigator();

const AppNavigation: React.FunctionComponent = ({children}) => {
  // init loading state for getting token from keychain
  const [isLoadingToken, setIsLoadingToken] = React.useState(false);

  // init auth
  const auth = useAuthContext();

  // get the auth token from secure storage
  React.useEffect(() => {
    async function getAccessTokenFromSecureStore() {
      try {
        setIsLoadingToken(true);
        const creds = await Keychain.getGenericPassword();
        if (creds) {
          auth.setToken?.(creds.password);
        }
      } catch (error) {
        // TODO navigate to login
      } finally {
        setIsLoadingToken(false);
      }
    }

    getAccessTokenFromSecureStore();
  }, []);

  if (isLoadingToken) {
    <Column verticalAlign="center">
      <Text>Loading...</Text>
    </Column>;
  }

  return (
    <Stack.Navigator>
      {auth.token == null ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
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
  );
};

const queryClient = new QueryClient();

const App = () => {
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
        <AuthContextProvider>
          <AppNavigation />
        </AuthContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
