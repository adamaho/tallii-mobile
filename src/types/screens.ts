export type SearchStackParamList = {
  ViewScoreboardScreen: {
    scoreboardId: number;
  };
  ViewSearchScreen: undefined;
  ViewTeamScreen: {
    teamId: number;
  };
  ViewUserProfileScreen: {
    userId: number;
  };
};

export type ScoreboardStackParamList = {
  ViewScoreboardScreen: {
    scoreboardId: number;
  };
  ViewTeamScreen: {
    teamId: number;
    scoreboardId: number;
  };
};

export type CreateScoreboardStackParamList = {
  CreateScoreboardScreen: undefined;
  CreateTeamScreen: undefined;
};

export type RootStackParamList = {
  CreateScoreboardStack: {
    screen: keyof CreateScoreboardStackParamList;
  };
  EditAvatar: {
    returnTo: 'MyProfile';
    backgroundColor: string;
    emoji: string;
  };
  ViewHomeScreen: undefined;
  ViewLoginScreen: undefined;
  MyProfileStack: undefined;
  ScoreboardStack: {
    screen: keyof ScoreboardStackParamList;
    params: {
      scoreboardId: number;
    };
  };
  SearchStack: undefined;
  ViewUserProfileScreen: {
    userId: number;
  };
  ViewTeam: {teamId: number; scoreboardId: number};
  ViewSignupScreen: undefined;
  ViewScoreboards: undefined;
};
