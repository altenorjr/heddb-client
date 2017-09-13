import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import jss from 'react-jss';
import cx from 'classnames';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import breakpoint from '../breakpoint';

import { toggleDrawerOpened as onToggleDrawer } from '../redux/drawer';

class AdminPageWithTopBar extends PureComponent {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        rightIcon: PropTypes.node,
        onRightIconClick: PropTypes.func
    }

    static defaultProps = {
        rightIcon: (<AddIcon />),
        onRightIconClick: () => { }
    }

    toggleDrawer = () => {
        this.props.onToggleDrawer(!this.props.drawerOpen);
    }

    render = () => {
        const {
            classes,
            title,
            className,
            drawerDocked,
            rightIcon,
            onRightIconClick,
            children
        } = this.props;

        const appBarProps = {
            title: (<h1>{title}</h1>),
            className: classes.appBar,
            onLeftIconButtonTouchTap: this.toggleDrawer,
            showMenuIconButton: !drawerDocked,
            iconElementRight: (<IconButton>{rightIcon}</IconButton>),
            onRightIconButtonTouchTap: onRightIconClick
        };

        return (
            <div className={cx(classes.page, className)}>
                <AppBar {...appBarProps} />
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        )
    }
}

AdminPageWithTopBar = jss({
    page: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        position: 'sticky !important',
        top: 0
    },
    content: {
        minHeight: '100vh',
        padding: '24px',
        [`@media (max-width: ${breakpoint}px)`]: {
            padding: 0
        }
    }
})(AdminPageWithTopBar);

const mapStateToProps = (state) => ({
    drawerOpen: state.getIn(['drawer', 'isOpen']),
    drawerDocked: state.getIn(['drawer', 'isDocked']),
    width: state.get('dimensions').width
});

const mapDispatchToProps = ({
    onToggleDrawer
});

const mergeProps = (s, d, o) => Object.assign({}, o, d, s);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminPageWithTopBar);