import React from 'react';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}

export default Main;
