export type SearchStackParamList = {
  ViewScoreboardScreen: {
    scoreboardId: number;
  };
  ViewSearchScreen: undefined;
  ViewTeamScreen: {
    teamId: number;
  };
  ViewUserProfileScreen: {
    userId: undefined;
  };
};

export type ScoreboardStackParamList = {
  ViewScoreboardScreen: {
    scoreboardId: number;
  };
  ViewTeamScreen: {
    teamId: number;
  };
};

export type RootStackParamList = {
  CreateScoreboard: undefined;
  CreateTeam: undefined;
  EditAvatar: {
    returnTo: 'MyProfile';
    backgroundColor: string;
    emoji: string;
  };
  ViewHomeScreen: undefined;
  ViewLoginScreen: undefined;
  ViewMyProfileScreen: {
    backgroundColor?: string;
    emoji?: string;
  };
  ScoreboardStack: {
    screen: keyof ScoreboardStackParamList;
    params: {
      scoreboardId: number;
    };
  };
  ViewSearchStack: undefined;
  ViewUserProfileScreen: {
    userId: number;
  };
  ViewTeam: {teamId: number; scoreboardId: number};
  ViewSignupScreen: undefined;
  ViewScoreboards: undefined;
};
