export type SearchStackParamList = {
  Search: undefined;
  UserProfile: {
    userId: undefined;
  };
  Scoreboard: {
    scoreboardId: number;
  };
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Scoreboards: undefined;
  CreateScoreboard: undefined;
  ViewScoreboard: {scoreboardId: number};
  CreateTeam: undefined;
  MyProfile: {
    backgroundColor?: string;
    emoji?: string;
  };
  UserProfile: {
    userId: number;
  };
  SearchStack: undefined;
  ScoreboardStack: {
    screen: 'ViewScoreboard';
    params: {
      scoreboardId: number;
    };
  };
  ViewTeam: {teamId: number; scoreboardId: number};
  EditAvatar: {
    returnTo: 'MyProfile';
    backgroundColor: string;
    emoji: string;
  };
};
