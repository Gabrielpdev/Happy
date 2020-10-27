import React from 'react';
import { Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '../hooks/themes';

import Route from './routes';

import GlobalStyle from '../styles/globalStyles';
import 'leaflet/dist/leaflet.css';

import light from '../styles/themes/light';

import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';

function Routes() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme || light}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/login" component={SignIn} />

        <Route path="/dashboard" component={Dashboard} isPrivate />

        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id" component={Orphanage} />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default Routes;
