import React from 'react';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import Menu from './Menu';

import logo from '../static/img/heddb-logo.png';

const TopBar = ({ classes }) => (
    <div className={classes.container}>
        <Holder className={classes.topBar}>
            <Panel className={classes.mainContent}>
                <img src={logo} alt="Hoje é dia de Blues - Logo" className={classes.logo} />
                <img src="./img/antena-zero.png" alt="Antena Zero" className={classes.logo} />
            </Panel>
        </Holder>
        <Menu />
    </div>
);

const styles = {
    container: {
        position: 'fixed',
        top: -1,
        height: '225px',
        zIndex: 9
    },
    topBar: {
        background: 'rgba(255, 255, 255, .8)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        '&::before': {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: -1,
            display: 'block',
            position: 'absolute',
            content: '" "',
            backgroundColor: 'rgba(255, 255, 255, .85)',
            backgroundSize: 'cover',
            filter: 'blur(20px)'
        } 
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '150px',
    }
};

export default jss(styles)(TopBar);