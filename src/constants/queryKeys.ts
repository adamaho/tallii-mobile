enum QueryKeys {
  AUTHORIZE = 'AUTHORIZE',
  ME = 'ME',
  SCOREBOARDS = 'SCOREBOARDS',
  SEARCH = 'SEARCH',
  TEAM = 'TEAM',
  USER = 'USER',
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

/**
 * the cache key for the currently logged in user
 */
export const me = () => {
  return QueryKeys.ME;
};

/**
 * the cache key for teh results of a search
 */
export const search = (query?: string) => {
  if (query) {
    return [QueryKeys.SEARCH, query];
  }

  return QueryKeys.SEARCH;
};

/**
 * the cache key for the currently logged in user
 */
export const user = (userId: number) => {
  return [QueryKeys.USER, userId];
};

/**
 * the cache key for the currently logged in user
 */
export const userScoreboards = (userId: number) => {
  return [QueryKeys.USER, userId, 'scoreboards'];
};
