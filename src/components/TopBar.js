import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import Drawer from 'material-ui/Drawer';

import Holder from './Holder';
import Panel from './Panel';
import Menu from './Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import breakpoint from '../breakpoint';

import publicityZoneFactory from './PublicityZone';

const BannerPublicityZone = publicityZoneFactory('banner');

class TopBar extends PureComponent {
    state = {
        drawerOpen: false
    }

    render = () => {
        const { classes, width } = this.props;

        const { drawerOpen } = this.state;

        return (
            <div className={classes.container}>
                <Holder className={classes.topBar}>
                    <Panel className={classes.mainContent}>
                        {
                            width <= breakpoint && (
                                <IconButton
                                    className={classes.menuButton}
                                    onTouchTap={() => this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))}
                                    iconStyle={{ color: '#FFF' }}
                                >
                                    {/* iconClassName={classes.menuIcon} */}
                                    <MenuIcon />
                                </IconButton>
                            )
                        }
                        <img
                            src="/img/heddb-logo.png"
                            alt="Hoje é dia de Blues"
                            className={classes.logo}
                        />
                        <BannerPublicityZone
                            className={classes.banner}
                            dots={false}
                        />
                    </Panel>
                </Holder>
                {
                    width > breakpoint && (
                        <Menu />
                    )
                }
                {
                    width <= breakpoint && (
                        <Drawer
                            open={drawerOpen}
                            docked={false}
                            onRequestChange={() => this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))}
                        >
                            <div className={classes.logoHolder}>
                                <img
                                    src="/img/heddb-logo.png"
                                    alt="Hoje é dia de Blues"
                                    className={classes.logo}
                                />
                            </div>
                            <Menu 
                                onItemSelected={() => this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }))}
                            />
                        </Drawer>
                    )
                }
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'fixed',
        top: -1,
        height: '200px',
        zIndex: 9,
        [`@media (max-width: ${breakpoint}px)`]: {
            height: '100px',
            width: '100%',
            position: 'sticky',
            top: '-100px'
        }
    },
    topBar: {
        background: '#2F2E33',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        [`@media (max-width: ${breakpoint}px)`]: {
            // position: 'sticky',
            // top: '0px'
        }
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '124px',
        [`@media (max-width: ${breakpoint}px)`]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100vw',
            height: '200px',
            // position: 'sticky',
            // top: 0
        }
    },
    logoHolder: {
        backgroundColor: '#2F2E33',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        position: 'sticky',
        top: 0,
        '& img': {
            position: 'static !important'
        }
    },
    logo: {
        order: 0,
        [`@media (max-width: ${breakpoint}px)`]: {
            height: '100px',
            display: 'block',
            order: 1,
            position: 'absolute',
            top: '100px'
        }
    },
    banner: {
        order: 1,
        [`@media (max-width: ${breakpoint}px)`]: {
            order: 0
        }
    },
    menuButton: {
        position: 'absolute !important',
        top: '126px',
        left: 0
    },
    menuIcon: {
        color: '#FFF'
    }
};

TopBar = jss(styles)(TopBar);

const mapStateToProps = (state) => ({
    width: state.getIn(['dimensions', 'width'])
});

export default connect(mapStateToProps)(TopBar);