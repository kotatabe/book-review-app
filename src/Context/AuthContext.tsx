import { createContext, useEffect, useState } from 'react';
import { Props } from './PropsInterface';

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string | null;
}

export const AuthContext = createContext({} as AuthContextInterface);

function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    authToken ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
