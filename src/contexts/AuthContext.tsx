import React from 'react';

import {useQuery} from 'react-query';

import {usePlatformApi} from '../hooks';
import {getPlatformApi} from '../apiClient/api';
import {authorize} from '../constants';

interface AuthContextProps {
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<string | undefined>>;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  authorize?: (token: string) => Promise<any>;
}

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticating: false,
  isAuthenticated: false,
});

export const AuthContextProvider: React.FunctionComponent = ({children}) => {
  const [token, setToken] = React.useState<string | undefined>();

  const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // checks if the users jwt is good and if so sets it in state
  const authorize = React.useCallback(async (token: string) => {
    const api = getPlatformApi(token);

    try {
      setIsAuthenticating(true);
      const response = await api.getAuthorize();
      console.log(response);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{token, setToken, authorize, isAuthenticating, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

// auth context hook
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
