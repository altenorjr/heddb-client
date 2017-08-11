import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { adminPaths } from '../paths';

const theme = getMuiTheme({ fontFamily: 'Bellefair' })

const Admin = (props) => (
    <MuiThemeProvider>
        <Switch>
            {
                adminPaths.map(({ name, ...props }, i) => (
                    <Route key={i} exact {...props} />
                ))
            }
        </Switch>
    </MuiThemeProvider>
);

export default withRouter(Admin);