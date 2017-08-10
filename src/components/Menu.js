import React from 'react';
import jss from 'react-jss';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Panel from './Panel';
import Holder from './Holder';

import paths from '../paths';

const Menu = ({ classes }) => (
    <Holder className={classes.menuHolder}>
        <Panel className={cx(classes.menu, "accent-font")} element="ul">
            {
                paths.map(({ path, name }, i) => (
                    <li key={i} className={classes.menuItem}>
                        <NavLink to={path} data-role="link" exact className={classes.link} activeClassName={classes.activeLink}>{name}</NavLink>
                    </li>
                ))
            }
        </Panel>
    </Holder>
);

export default jss({
    menuHolder: {
        background: 'rgba(255, 255, 255, .9)',
        zIndex: 10
    },
    menu: {
        borderTop: '1px solid #CCC',
        borderBottom: '1px solid #CCC',
        flexDirection: 'row',
        height: '75px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    menuItem: {
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '30px',
        color: '#666',
    },
    link: {
        transform: 'scale(1)',
        display: 'block',
        transition: '.3s',
        '&:hover': {
            transform: 'scale(1.2)',
            color: '#000'
        }
    },
    activeLink: {
        transform: 'scale(1.2)',
        color: '#000 !important'
    }
})(Menu);