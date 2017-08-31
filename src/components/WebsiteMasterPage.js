import React from 'react';
import jss from 'react-jss';

import TopBar from './TopBar';
import Holder from './Holder';
import Panel from './Panel';

const UglyWebsiteMasterPage = ({ children, classes, sheet }) => (
    <div>
        <TopBar />
        <Holder className={classes.body}>
            {children}
        </Holder>
        <Holder>
            <Panel>

            </Panel>
        </Holder>
    </div>
);

const WebsiteMasterPage = jss({
    body: {
        paddingTop: '199px'
    }
})(UglyWebsiteMasterPage);

export default WebsiteMasterPage;