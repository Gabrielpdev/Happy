import React from 'react';
import Routes from './routes';
import { ThemesProvider } from './hooks/Themes';

function App() {
  return (
    <ThemesProvider>
      <Routes/>
    </ThemesProvider>
  );
}

export default App;
