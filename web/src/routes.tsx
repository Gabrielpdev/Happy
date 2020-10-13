import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { useTheme } from './hooks/Themes';

import light from './styles/themes/light'

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';


function Routes() {
  const { theme } = useTheme();

  return(
    <ThemeProvider theme={theme ? theme : light} >
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/app' component={OrphanagesMap} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Routes;