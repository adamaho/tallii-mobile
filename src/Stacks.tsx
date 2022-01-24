import React from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateScoreboardScreen,
  CreateTeamScreen,
  ViewSearchScreen,
  ViewUserProfileScreen,
  ViewScoreboardScreen,
  ViewTeamScreen,
  ViewMyProfileScreen,
  EditAvatar,
} from './screens';

/** ----------------------------------------------------------
 * Search Stack
 * -----------------------------------------------------------*/
const SearchStack = createNativeStackNavigator();

export const SearchNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="ViewSearchSreen" component={ViewSearchScreen} />
      <SearchStack.Screen name="ViewUserProfileScreen" component={ViewUserProfileScreen} />
      <SearchStack.Screen name="ViewScoreboardScreen" component={ViewScoreboardScreen} />
      <SearchStack.Screen name="ViewTeamScreen" component={ViewTeamScreen} />
    </SearchStack.Navigator>
  );
};

/** ----------------------------------------------------------
 * Scoreboard Stack
 * -----------------------------------------------------------*/
const ScoreboardStack = createNativeStackNavigator();

export const ScoreboardNavigator = () => {
  return (
    <ScoreboardStack.Navigator screenOptions={{headerShown: false}}>
      <ScoreboardStack.Screen name="ViewScoreboardScreen" component={ViewScoreboardScreen} />
      <ScoreboardStack.Screen name="ViewTeamScreen" component={ViewTeamScreen} />
    </ScoreboardStack.Navigator>
  );
};

/** ----------------------------------------------------------
 * Create Scoreboard Stack
 * -----------------------------------------------------------*/
const CreateScoreboardStack = createNativeStackNavigator();

export const CreateScoreboardNavigator = () => {
  return (
    <CreateScoreboardStack.Navigator>
      <CreateScoreboardStack.Group screenOptions={{headerShown: false}}>
        <CreateScoreboardStack.Screen
          name="CreateScoreboardScreen"
          component={CreateScoreboardScreen}
        />
        <CreateScoreboardStack.Screen name="CreateTeamScreen" component={CreateTeamScreen} />
      </CreateScoreboardStack.Group>
    </CreateScoreboardStack.Navigator>
  );
};

/** ----------------------------------------------------------
 * My Profile Stack
 * -----------------------------------------------------------*/
const MyProfileStack = createNativeStackNavigator();

export const MyProfileNavigator = () => {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Group screenOptions={{headerShown: false}}>
        <MyProfileStack.Screen name="ViewMyProfileScreen" component={ViewMyProfileScreen} />
        <MyProfileStack.Screen name="EditAvatar" component={EditAvatar} />
      </MyProfileStack.Group>
    </MyProfileStack.Navigator>
  );
};
