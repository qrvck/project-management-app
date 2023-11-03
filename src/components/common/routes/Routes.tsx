import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IRouteProps {
  user: boolean;
  redirectPath?: string;
  children?: ReactElement;
}

export const PublicRoute = ({
  user,
  redirectPath = '/boards-list',
  children,
}: IRouteProps): JSX.Element => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export const PrivateRoute = ({ user, redirectPath = '/', children }: IRouteProps): JSX.Element => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
