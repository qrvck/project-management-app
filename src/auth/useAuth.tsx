import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import jwtDecode, { JwtPayload } from 'jwt-decode';
import { signUp as signUpApi, signIn as signInApi } from 'api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, login: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (errorMessage) setErrorMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('pm-token');

    if (token) {
      setLogoutTimer(token);
    }

    setLoadingInitial(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLogoutTimer = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const millisecondsInOneSecond = 1000;
    const tokenExpirationTime = decodedToken.exp ? decodedToken.exp * millisecondsInOneSecond : 0;
    const currentTime = new Date().getTime();
    const tokenEndIn = tokenExpirationTime - currentTime;

    if (tokenEndIn > 1) {
      setAuthenticated(true);

      setTimeout(() => {
        logout();
        navigate('/');
      }, tokenEndIn);
    } else {
      logout();
    }
  };

  async function signIn(login: string, password: string) {
    setLoading(true);

    signInApi(login, password)
      .then((response) => {
        setAuthenticated(true);
        localStorage.setItem('pm-token', JSON.stringify(response.token));
        navigate('/boards-list');
        setLogoutTimer(response.token);
      })
      .catch((error) => {
        if (error instanceof Error) setErrorMessage(error.message.toLowerCase());
      })
      .finally(() => setLoading(false));
  }

  function signUp(name: string, login: string, password: string) {
    setLoading(true);

    signUpApi(name, login, password)
      .then(() => {
        signIn(login, password);
      })
      .catch((error) => {
        if (error instanceof Error) setErrorMessage(error.message.toLowerCase());
        setLoading(false);
      });
  }

  function logout() {
    localStorage.removeItem('pm-token');
    setAuthenticated(false);
    navigate('/');
  }

  const memoedValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      errorMessage,
      signIn,
      signUp,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, isLoading, errorMessage]
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
