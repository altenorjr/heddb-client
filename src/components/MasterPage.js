import React from 'react';
import jss from 'react-jss';

import TopBar from './TopBar';
import Holder from './Holder';

const UglyMasterPage = ({ children, classes, sheet }) => (
    <div>
        <TopBar />
        <Holder className={classes.body}>
            {children}
        </Holder>
    </div>
);

const MasterPage = jss({
    body: {
        paddingTop: '224px'
    }
})(UglyMasterPage);

export default MasterPage;