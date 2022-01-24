import React from 'react';

import * as Keychain from 'react-native-keychain';

import {QueryClient, QueryClientProvider} from 'react-query';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {theme} from './design-system/theme';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {Scoreboards} from './screens/ScoreboardsScreen';
import {CreateScoreboard} from './screens/CreateScoreboard/CreateScoreboard';
import {CreateTeam} from './screens/CreateTeam';
import {SearchScreen} from './screens/SearchScreen';
import {ViewScoreboard} from './screens/ViewScoreboard';
import {ViewTeam} from './screens/ViewTeam';
import {MyProfileScreen} from './screens/MyProfileScreen';
import {EditAvatar} from './screens/EditAvatar';
import {UserProfileScreen} from './screens/UserProfileScreen';

import {AuthContextProvider, useAuthContext, CreateTeamContextProvider} from './contexts';
import {Column, ToastContextProvider} from './design-system';
import {Logo, ModalThumb} from './components';
// import { Playground } from './screens/Playground';

/** ----------------------------------------------------------
 * Search Stack
 * -----------------------------------------------------------*/
const SearchStack = createNativeStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Group screenOptions={{headerTitle: ModalThumb, headerBackVisible: false}}>
        <SearchStack.Screen name="Search" component={SearchScreen} />
        <SearchStack.Screen name="UserProfile" component={UserProfileScreen} />
        <SearchStack.Screen name="ViewScoreboard" component={ViewScoreboard} />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};

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
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Group>
          ) : (
            <>
              <Stack.Group screenOptions={{headerShown: false}}>
                {/* <Stack.Screen name="Playground" component={Playground} /> */}
                <Stack.Screen name="Scoreboards" component={Scoreboards} />
                <Stack.Screen name="ViewScoreboard" component={ViewScoreboard} />
              </Stack.Group>
              <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
                <Stack.Screen name="SearchStack" component={SearchNavigator} />
                <Stack.Screen name="MyProfile" component={MyProfileScreen} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} />
                <Stack.Screen name="CreateScoreboard" component={CreateScoreboard} />
                <Stack.Screen name="CreateTeam" component={CreateTeam} />
                <Stack.Screen name="ViewTeam" component={ViewTeam} />
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
