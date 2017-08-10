import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

import MasterPage from './MasterPage';
import Routes from './Routes';

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <MasterPage>
        <Routes />
      </MasterPage>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;