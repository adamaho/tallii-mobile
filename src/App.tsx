import React from 'react';

import * as Keychain from 'react-native-keychain';

import {QueryClient, QueryClientProvider} from 'react-query';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {theme} from './design-system/theme';
import {EditAvatar} from './screens/EditAvatar';

import {ViewHomeScreen, ViewLoginScreen, ViewSignupScreen} from './screens';

import {
  SearchNavigator,
  ScoreboardNavigator,
  CreateScoreboardNavigator,
  MyProfileNavigator,
} from './Stacks';

import {AuthContextProvider, useAuthContext, CreateTeamContextProvider} from './contexts';
import {Column, ToastContextProvider} from './design-system';
import {Logo} from './components';
// import { Playground } from './screens/Playground';

/** ----------------------------------------------------------
 * Main App Stack
 * -----------------------------------------------------------*/
const Stack = createNativeStackNavigator();

const AppNavigation: React.FunctionComponent = () => {
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
          // check if the token is still valid and set it in state
          await auth.authorize?.(creds.password);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoadingToken(false);
      }
    }

    getAccessTokenFromSecureStore();
  }, []);

  if (isLoadingToken || auth.isAuthenticating) {
    return (
      <Column
        flex={1}
        verticalAlign="center"
        horizontalAlign="center"
        backgroundColor="widgetDefault"
      >
        <Logo />
      </Column>
    );
  }

  return (
    <CreateTeamContextProvider>
      <ToastContextProvider>
        <Stack.Navigator>
          {!auth.isAuthenticated ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="ViewLoginScreen" component={ViewLoginScreen} />
              <Stack.Screen name="ViewSignupScreen" component={ViewSignupScreen} />
            </Stack.Group>
          ) : (
            <>
              <Stack.Group screenOptions={{headerShown: false}}>
                {/* <Stack.Screen name="Playground" component={Playground} /> */}
                <Stack.Screen name="ViewHomeScreen" component={ViewHomeScreen} />
              </Stack.Group>
              <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
                <Stack.Screen name="ScoreboardStack" component={ScoreboardNavigator} />
                <Stack.Screen name="SearchStack" component={SearchNavigator} />
                <Stack.Screen name="CreateScoreboardStack" component={CreateScoreboardNavigator} />
                <Stack.Screen name="MyProfileStack" component={MyProfileNavigator} />
                <Stack.Screen name="EditAvatar" component={EditAvatar} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </ToastContextProvider>
    </CreateTeamContextProvider>
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
