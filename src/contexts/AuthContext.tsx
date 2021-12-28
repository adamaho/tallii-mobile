import React from 'react';

import * as Keychain from 'react-native-keychain';

import {getPlatformApi} from '../apiClient/api';

interface AuthContextProps {
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<string | undefined>>;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  authorize?: (token: string) => Promise<any>;
  logout?: () => void;
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
      await api.getAuthorize();
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  // logs the user out of the
  const logout = React.useCallback(async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.warn(error);
    } finally {
      setIsAuthenticated(false);
      setToken(undefined);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{token, setToken, authorize, isAuthenticating, isAuthenticated, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// auth context hook
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
