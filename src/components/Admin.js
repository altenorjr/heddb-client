import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import AdminMasterPage from './AdminMasterPage';

class Admin extends PureComponent {
    render = () => (
        <Switch>
            <Route path="/admin/" strict exact component={Login} />
            <Route path="/admin" component={AdminMasterPage} />
        </Switch>
    )
}

export default Admin;