import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AppProvider from './hooks/index';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
