export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Scoreboards: undefined;
  CreateScoreboard: undefined;
  ViewScoreboard: {scoreboardId: number};
  CreateTeam: undefined;
  ViewProfile: undefined;
  ViewTeam: {teamId: number; scoreboardId: number};
  EditAvatar: {
    onSave: (emoji: string, backgroundColor: string) => void;
    defaultBackgroundColor: string;
    defaultEmoji: string;
  };
};
