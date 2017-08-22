import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import Website from './Website';
import Admin from './Admin';

import store from '../redux/store';

class App extends Component {
  render = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Website} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App;