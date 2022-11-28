import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/common/layout/Layout';
import Loader from 'components/common/loader';

const AuthPage = lazy(() => import('pages/AuthPage'));
const BoardManagementPage = lazy(() => import('pages/BoardManagementPage'));
const BoardsListPage = lazy(() => import('pages/BoardsListPage'));
const WelcomePage = lazy(() => import('pages/WelcomePage'));
const EditProfilePage = lazy(() => import('pages/EditProfilePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="sign-in" element={<AuthPage />} />
          <Route path="sign-up" element={<AuthPage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="board-management" element={<BoardManagementPage />} />
          <Route path="boards-list" element={<BoardsListPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
