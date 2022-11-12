import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/common/layout/Layout';
import { AuthPage, BoardManagementPage, BoardsListPage, WelcomePage, EditProfilePage } from 'pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="board-management" element={<BoardManagementPage />} />
        <Route path="boards-list" element={<BoardsListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
