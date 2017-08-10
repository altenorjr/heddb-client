import React from 'react';
import { Switch, Route } from 'react-router-dom';

import paths from '../paths';

const Routes = () => (
    <Switch>
        {
            paths.map(({ name, ...props }, i) => (
                <Route key={i} exact {...props} />
            ))
        }
    </Switch>
);

export default Routes;