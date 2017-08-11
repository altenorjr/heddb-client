import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WebsiteMasterPage from './WebsiteMasterPage';

import { websitePaths } from '../paths';

const Website = () => (
    <WebsiteMasterPage>
        <Switch>
            {
                websitePaths.map(({ name, ...props }, i) => (
                    <Route key={i} exact {...props} />
                ))
            }
        </Switch>
    </WebsiteMasterPage>
);

export default Website;