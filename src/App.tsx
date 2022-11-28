import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ErrorBoundary from 'components/errorBoundary';

import Layout from 'components/common/layout/Layout';
import {
  AuthPage,
  BoardManagementPage,
  BoardsListPage,
  WelcomePage,
  EditProfilePage,
  NotFoundPage,
} from 'pages';

function App() {
  return (
    <ErrorBoundary useSuspense={false} key={useLocation().pathname}>
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
    </ErrorBoundary>
  );
}

export default App;
