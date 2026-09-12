import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import store from '@store/index';
import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import { NotificationProvider } from '@contexts/NotificationContext';
import App from './App';

import '@assets/styles/globals.css';
import '@assets/styles/variables.css';
import '@assets/styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <NotificationProvider>
                <App />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'oklch(0.11 0.003 60)',
                      color: 'oklch(0.96 0.008 90)',
                      border: '1px solid oklch(0.22 0.006 70)',
                      borderRadius: '12px',
                      fontSize: '14px',
                    },
                    success: {
                      iconTheme: {
                        primary: 'oklch(0.76 0.11 82)',
                        secondary: 'oklch(0.08 0 0)',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'oklch(0.577 0.245 27.325)',
                        secondary: 'oklch(0.96 0.008 90)',
                      },
                    },
                  }}
                />
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);