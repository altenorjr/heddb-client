import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import WebsiteMasterPage from './WebsiteMasterPage';

import { websitePaths } from '../paths';

class Website extends PureComponent {
    componentDidMount = () => this.props.updateLocation

    render = () => {
        const { location } = this.props

        return (
            <WebsiteMasterPage location={location}>
                <Switch>
                    {
                        websitePaths.map(({ name, ...props }, i) => (
                            <Route key={i} exact {...props} />
                        ))
                    }
                </Switch>
            </WebsiteMasterPage>
        );
    }
}

export default Website;