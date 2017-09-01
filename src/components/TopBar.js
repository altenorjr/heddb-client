import React from 'react';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import Menu from './Menu';

import publicityZoneFactory from './PublicityZone';

const BannerPublicityZone = publicityZoneFactory('banner');

let TopBar = ({ classes }) => (
    <div className={classes.container}>
        <Holder className={classes.topBar}>
            <Panel className={classes.mainContent}>
                <img src="/img/heddb-logo.png" alt="Hoje é dia de Blues" />
                <BannerPublicityZone dots={false} />
            </Panel>
        </Holder>
        <Menu />
    </div>
);

const styles = {
    container: {
        position: 'fixed',
        top: -1,
        height: '124px',
        zIndex: 9
    },
    topBar: {
        background: '#2F2E33',
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
            backgroundColor: '#2F2E33',
            backgroundSize: 'cover',
            filter: 'blur(20px)'
        }
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '124px',
    },
    slider: {
        width: '500px'
    },
    sliderItem: {
        width: '500px',
        height: '124px',
        display: 'block',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
};

export default jss(styles)(TopBar);