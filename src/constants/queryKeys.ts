enum QueryKeys {
  AUTHORIZE = 'AUTHORIZE',
  SCOREBOARDS = 'SCOREBOARDS',
  TEAM = 'TEAM',
}

/**
 *
 * @returns the authorize cache key
 */
export const authorize = () => {
  return QueryKeys.AUTHORIZE;
};

/**
 *
 * @param scoreboardId the scoreboard id to create a query key for
 * @returns the cache key for scoreboards
 */
export const scoreboards = (scoreboardId?: number) => {
  if (scoreboardId) {
    return [QueryKeys.SCOREBOARDS, scoreboardId];
  }

  return QueryKeys.SCOREBOARDS;
};

/**
 *
 * @param teamId the team id
 * @returns the cache key for the team
 */
export const team = (teamId: number) => {
  return [QueryKeys.TEAM, teamId];
};
