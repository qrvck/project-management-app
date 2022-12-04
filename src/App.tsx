import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loader from 'components/common/loader';
import ErrorBoundary from 'components/errorBoundary';
import { PublicRoute, PrivateRoute } from 'components/common/routes';
import useAuth from 'auth/useAuth';

const Layout = lazy(() => import('components/common/layout'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));
const BoardManagementPage = lazy(() => import('pages/BoardManagementPage'));
const BoardsListPage = lazy(() => import('pages/BoardsListPage'));
const WelcomePage = lazy(() => import('pages/WelcomePage'));
const EditProfilePage = lazy(() => import('pages/EditProfilePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ErrorBoundary useSuspense={false} key={useLocation().pathname}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route element={<PublicRoute user={isAuthenticated} />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>
            <Route element={<PrivateRoute user={isAuthenticated} />}>
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="board-management" element={<BoardManagementPage />} />
              <Route path="boards-list" element={<BoardsListPage />} />
            </Route>
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
