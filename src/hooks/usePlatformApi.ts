import React from 'react';

import {getPlatformApi} from '../apiClient/api';
import {useAuthContext} from '../contexts';

// hook for getting an instance of the authAPI
export function usePlatformApi() {
  const auth = useAuthContext();
  // return an instance of the authAPI with the token if it is available
  return React.useMemo(() => {
    return getPlatformApi(auth.token);
  }, []);
}
