enum QueryKeys {
  AUTHORIZE = 'AUTHORIZE',
  SCOREBOARDS = 'SCOREBOARDS',
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
