import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemesProvider } from './themes';

const AppProvider: React.FC = ({ children }) => (
  <ThemesProvider>
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  </ThemesProvider>
);

export default AppProvider;
