import React from 'react';

import type {CreateScoreboardRequestModelTeams} from '../apiClient';

export interface Team extends CreateScoreboardRequestModelTeams {
  id: number;
}

interface CreateTeamContextProps {
  teams: Team[];
  addTeam: (team: CreateScoreboardRequestModelTeams) => void;
  removeTeam: (id: number) => void;
  clearTeams: () => void;
}

const CreateTeamContext = React.createContext<CreateTeamContextProps>({
  teams: [],
  addTeam: team => {
    return;
  },
  removeTeam: id => {
    return;
  },
  clearTeams: () => {
    return;
  },
});

export const useCreateTeamContext = () => {
  return React.useContext(CreateTeamContext);
};

export const CreateTeamContextProvider: React.FunctionComponent = ({children}) => {
  // init ref to track the teams
  const nextId = React.useRef(0);

  // init state of teams
  const [teams, setTeams] = React.useState<Team[]>([]);

  // adds a team
  const addTeam = React.useCallback(
    (team: CreateScoreboardRequestModelTeams) => {
      // craft the team
      const teamToAdd: Team = {
        ...team,
        id: nextId.current,
      };

      // set the teams in state
      setTeams(current => {
        const teams = [...current];

        teams.push(teamToAdd);

        return teams;
      });

      // increment the next id
      nextId.current += 1;
    },
    [nextId],
  );

  // removes a team
  const removeTeam = React.useCallback((id: number) => {
    setTeams(current => {
      const currentTeams = [...current];

      return currentTeams.filter(t => t.id !== id);
    });
  }, []);

  // clears all the teams
  const clearTeams = React.useCallback(() => {
    setTeams([]);
  }, []);

  return (
    <CreateTeamContext.Provider
      value={{
        teams,
        addTeam,
        removeTeam,
        clearTeams,
      }}
    >
      {children}
    </CreateTeamContext.Provider>
  );
};
