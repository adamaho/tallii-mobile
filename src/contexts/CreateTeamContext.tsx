import React from 'react';

import type {CreateScoreboardRequestModelTeams} from '../apiClient';

interface Team extends CreateScoreboardRequestModelTeams {
  id: number;
}

const CreateTeamContext = React.createContext<Team[]>([]);

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

  return <CreateTeamContext.Provider value={teams}>{children}</CreateTeamContext.Provider>;
};
