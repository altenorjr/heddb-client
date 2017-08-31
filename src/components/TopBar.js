import React from 'react';
import jss from 'react-jss';
import Slider from 'react-slick';


import Holder from './Holder';
import Panel from './Panel';
import Menu from './Menu';

import logo from '../static/img/heddb-logo.png';

const TopBar = ({ classes }) => (
    <div className={classes.container}>
        <Holder className={classes.topBar}>
            <Panel className={classes.mainContent}>
                <img src="/img/heddb-logo.png" alt="Hoje é dia de Blues" />
                <Slider 
                    className={classes.slider}
                    arrows={false}
                    dots={false}
                    autoplay
                    autoplaySpeed={8000}
                >
                    <div className={classes.sliderItem}>
                        <img src="/img/antena-zero.png" alt="Antena Zero" className={classes.logo} />
                    </div>
                </Slider>
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
        width: '100%',
        textAlign: 'right',
        '& img': {
            display: 'inline'
        }
    }
};

export default jss(styles)(TopBar);