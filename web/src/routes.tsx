import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/Themes';

import GlobalStyle from './styles/globalStyles';
import 'leaflet/dist/leaflet.css';

import light from './styles/themes/light'

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';


function Routes() {
  const { theme } = useTheme();

  return(
    <ThemeProvider theme={theme ? theme : light} >
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/app' component={OrphanagesMap} />

          <Route path='/orphanage/create' component={CreateOrphanage} />
          <Route path='/orphanage/:id' component={Orphanage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Routes;