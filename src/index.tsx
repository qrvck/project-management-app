import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './auth/useAuth';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App';
import './i18n';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
