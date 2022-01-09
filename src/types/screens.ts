import type {Atoms} from '../design-system/atoms';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Scoreboards: undefined;
  CreateScoreboard: undefined;
  ViewScoreboard: {scoreboardId: number};
  CreateTeam: undefined;
  ViewProfile: {
    backgroundColor?: string;
    emoji?: string;
  };
  ViewTeam: {teamId: number; scoreboardId: number};
  EditAvatar: {
    returnTo: 'ViewProfile';
    backgroundColor: string;
    emoji: string;
  };
};
