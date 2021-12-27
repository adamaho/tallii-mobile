import React from 'react';

interface AuthContextProps {
  token?: string;
  setToken?: React.Dispatch<React.SetStateAction<string | undefined>>;
  verifyToken?: any;
}

const AuthContext = React.createContext<AuthContextProps>({});

// setToken
// token
// verify token

export const AuthContextProvider: React.FunctionComponent = ({children}) => {
  // init token
  const [token, setToken] = React.useState<string | undefined>();

  // init query to verify the token

  return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>;
};

// auth context hook
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
