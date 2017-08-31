import React, { PureComponent } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import jss from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink, Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

import withDimensions from './hoc/withDimensions';
import { logout } from '../redux/authentication';
import { toggleDrawerOpened } from '../redux/drawer';
import { updateDimensions } from '../redux/dimensions';
import { adminPaths } from '../paths';

class AdminMasterPage extends PureComponent {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired,
        onLogout: PropTypes.func.isRequired,
        updateDimensions: PropTypes.func.isRequired,
        dimensions: PropTypes.object.isRequired,
        drawer: PropTypes.object.isRequired,
        toggleDrawerOpened: PropTypes.func.isRequired
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dimensions.width !== this.props.dimensions.width) {
            this.props.updateDimensions(nextProps.dimensions);
        }
    }

    logout = () => {
        this.props.onLogout();
    }

    toggleDrawer = () => this.props.toggleDrawerOpened(!this.props.drawer.get('isOpen'))

    render = () => {
        const { authenticated, classes } = this.props;

        if (!authenticated) {
            return (<Redirect to="/admin/" />);
        }

        return (
            <div className={classes.masterPage}>
                <Drawer
                    className={classes.drawer}
                    open={this.props.drawer.get('isOpen')}
                    docked={this.props.drawer.get('isDocked')}
                    onRequestChange={this.toggleDrawer}
                >
                    <div className={classes.logoHolder}>
                        <Link to="/" target="_blank">
                            <img src="/img/heddb-logo.png" alt="Hoje é dia de Blues - Sistema Administrativo" />
                        </Link>
                    </div>
                    <Menu className={classes.menu}>
                        {
                            adminPaths.map(({ path, name }, i) => (
                                <MenuItem 
                                    key={i} 
                                    containerElement={<NavLink to={path} />}
                                    primaryText={name} />
                            ))
                        }
                        <MenuItem onTouchTap={this.logout}>Sair</MenuItem>
                    </Menu>
                </Drawer>
                <div className={classes.container}>
                    <Switch>
                        <Route path="/admin" exact render={() => (<Redirect to={adminPaths[0].path} />)} />
                        {
                            adminPaths.map((path, i) => (
                                <Route key={i} {...path} />
                            ))
                        }
                    </Switch>
                </div>
            </div>
        );
    }
}

const AdminMasterPageStyled = withDimensions(jss({
    masterPage: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    drawer: {
        '& div[role="presentation"]': {
            width: '256px'
        }
    },
    logoHolder: {
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F2E33'
    },
    menu: {
        width: '256px !important'
    },
    menuItem: {
        // pointerEvents: 'none'
    },
    container: {
        flex: 1,
        paddingLeft: ({ drawer }) => drawer.get('isDocked') ? '256px' : 0
    },
    appBar: {
        position: 'fixed !important',
        top: 0
    }
})(AdminMasterPage));

export { AdminMasterPageStyled as AdminMasterPage };

const mapStateToProps = (state) => ({
    authenticated: state.getIn(['authentication', 'authenticated']),
    drawer: state.get('drawer')
});

const mergeProps = (state, dispatch, own) => Object.assign({}, own, state, dispatch);

const mapDispatchToProps = {
    onLogout: logout,
    updateDimensions,
    toggleDrawerOpened
};

const AdminMasterPageConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminMasterPageStyled);

export default AdminMasterPageConnected;