import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Website from './Website';
import Admin from './Admin';

const App = () => (
  <MuiThemeProvider>
    <HashRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Website} />
      </Switch>
    </HashRouter>
  </MuiThemeProvider>
);

export default App;