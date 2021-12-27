import React from 'react';

import {getPlatformApi} from '../apiClient/api';

// hook for getting an instance of the authAPI
export function usePlatformApi() {
  // return an instance of the authAPI with the token if it is available
  return React.useMemo(() => {
    return getPlatformApi('');
  }, []);
}
