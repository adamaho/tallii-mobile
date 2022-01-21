import type {Atoms} from '../design-system/atoms';

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
  SearchScreen: undefined;
  ViewTeam: {teamId: number; scoreboardId: number};
  EditAvatar: {
    returnTo: 'MyProfile';
    backgroundColor: string;
    emoji: string;
  };
};
