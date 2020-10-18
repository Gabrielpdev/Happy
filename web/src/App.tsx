import React from 'react';
import Routes from './routes';
import { ThemesProvider } from './hooks/themes';

function App() {
  return (
    <ThemesProvider>
      <Routes />
    </ThemesProvider>
  );
}

export default App;
