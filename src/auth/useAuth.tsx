import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import jwtDecode, { JwtPayload } from 'jwt-decode';
import { signUp as signUpApi, signIn as signInApi } from 'api/auth';

interface IUser {
  id: string;
  login: string;
  token: string;
}

interface IParsedToken extends JwtPayload {
  exp: number;
  id: string;
  login: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser;
  isLoading: boolean;
  errorMessage: string;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, login: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({ id: '', login: '', token: '' });
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
      const tokenValidityTime = getTokenValidityTime(token);
      if (tokenValidityTime > 0) {
        setAuthenticated(true);
        setLogoutTimer(tokenValidityTime);
        saveUserData(token);
      } else {
        logout();
      }
    }

    setLoadingInitial(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getTokenValidityTime(token: string) {
    const decodedToken = jwtDecode<IParsedToken>(token);
    const millisecondsInOneSecond = 1000;
    const tokenExpirationTime = decodedToken.exp * millisecondsInOneSecond;
    const currentTime = new Date().getTime();
    const tokenEndIn = tokenExpirationTime - currentTime;

    return tokenEndIn;
  }

  function setLogoutTimer(tokenValidityTime: number) {
    setTimeout(() => {
      logout();
    }, tokenValidityTime);
  }

  function saveUserData(token: string) {
    const { id, login } = jwtDecode<IParsedToken>(token);
    setUser({ id, login, token });
  }

  async function signIn(login: string, password: string) {
    setLoading(true);

    signInApi(login, password)
      .then((response) => {
        localStorage.setItem('pm-token', JSON.stringify(response.token));

        const tokenValidityTime = getTokenValidityTime(response.token);

        setAuthenticated(true);
        setLogoutTimer(tokenValidityTime);
        saveUserData(response.token);
        navigate('/boards-list');
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
    setUser({ id: '', login: '', token: '' });
    navigate('/');
  }

  const memoedValue = useMemo(
    () => ({
      user,
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
