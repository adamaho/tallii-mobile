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

export type MyProfileStackParamList = {
  EditAvatarScreen: {
    backgroundColor: string;
    emoji: string;
  };
  ViewMyProfileScreen: {
    backgroundColor: string;
    emoji: string;
  };
};

export type RootStackParamList = {
  CreateScoreboardStack: {
    screen: keyof CreateScoreboardStackParamList;
  };
  ViewHomeScreen: undefined;
  ViewLoginScreen: undefined;
  MyProfileStack: {
    screen: keyof MyProfileStackParamList;
  };
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
  ViewSignupScreen: undefined;
  ViewScoreboards: undefined;
};
