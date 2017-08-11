import React from 'react';
import jss from 'react-jss';

import TopBar from './TopBar';
import Holder from './Holder';

const UglyWebsiteMasterPage = ({ children, classes, sheet }) => (
    <div>
        <TopBar />
        <Holder className={classes.body}>
            {children}
        </Holder>
    </div>
);

const WebsiteMasterPage = jss({
    body: {
        paddingTop: '224px'
    }
})(UglyWebsiteMasterPage);

export default WebsiteMasterPage;