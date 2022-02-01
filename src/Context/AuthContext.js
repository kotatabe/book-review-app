import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  authToken: '',
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    authToken ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
