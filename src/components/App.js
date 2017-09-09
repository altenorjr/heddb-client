import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import Website from './Website';
import Admin from './Admin';

import LocationSpy from './LocationSpy';

import store from '../redux/store';

class App extends Component {
  render = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <LocationSpy>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Website} />
            </Switch>
          </LocationSpy>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App;