import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import * as authApi from 'api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError('');
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('pm-token');

    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const millisecondTokenExpirationTime = decodedToken.exp ? decodedToken.exp / 1000 : 0;
      const millisecondCurrentTime = new Date().getTime();
      const tokenEndsInMilliseconds = millisecondTokenExpirationTime - millisecondCurrentTime;

      if (tokenEndsInMilliseconds > 1) {
        setAuthenticated(true);

        setTimeout(() => {
          logout();
          navigate('/');
        }, tokenEndsInMilliseconds);
      }
    }

    setLoadingInitial(false);
  }, []);

  function signIn(login: string, password: string) {
    setLoading(true);

    authApi
      .signIn({ login, password })
      .then((response) => {
        setAuthenticated(true);
        localStorage.setItem('pm-token', JSON.stringify(response.token));
        navigate('/boards-list');
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function signUp(name: string, login: string, password: string) {
    setLoading(true);

    authApi
      .signUp({ name, login, password })
      .then(() => {
        signIn(login, password);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    localStorage.removeItem('pm-token');
    setAuthenticated(false);
    navigate('/', { replace: true });
  }

  const memoedValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      error,
      signIn,
      signUp,
      logout,
    }),
    [isAuthenticated, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
export { AuthProvider };
