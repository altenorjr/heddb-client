import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Panel from './Panel';
import Holder from './Holder';
import Popover from './Popover';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import { getList } from '../redux/Articles';

import { websitePaths } from '../paths';

class Menu extends PureComponent {
    componentDidMount = this.props.getList()

    render = () => {
        const {
            classes,
            articles,
            metadata
        } = this.props;

        return (
            <Holder className={classes.menuHolder}>
                <Panel className={cx(classes.menu, "accent-font")} element="ul">
                    <li className={classes.menuItem}>
                        <NavLink 
                            to="/" 
                            data-role="link" 
                            className={classes.link} 
                            activeClassName={classes.activeLink}
                            exact 
                        >
                            Início
                        </NavLink>
                    </li>
                    {
                        websitePaths.filter(path => !path.virtual).map(({ path, name }, i) => (
                            <li key={i} className={classes.menuItem}>
                                <NavLink 
                                    to={path} 
                                    data-role="link" 
                                    className={classes.link} 
                                    activeClassName={classes.activeLink}
                                    exact 
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ))
                    }
                    <li className={classes.menuItem}>
                        <Popover
                            contentClassName={classes.articles}
                            title={(
                                <div className={classes.articles}>
                                    Artigos
                                    <ArrowDownIcon />
                                </div>
                            )}
                        >
                            <ul className={classes.items}>
                                {
                                    articles.map(({ name, link }, i) => (
                                        <li
                                            className={cx(classes.item, classes.li)}
                                            key={i}
                                        >
                                            <NavLink
                                                to={link}
                                                className={classes.link}
                                                activeClassName={classes.activeLink}
                                            >
                                                {name}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Popover>
                    </li>
                    <li className={classes.menuItem}>
                        <NavLink
                            to={metadata.about.link || '/paginas/sobre'}
                            data-role="link"
                            className={classes.link}
                            activeClassName={classes.activeLink}
                            exact
                        >
                            {metadata.about.name || 'Sobre'}
                        </NavLink>
                    </li>
                    <li className={classes.menuItem}>
                        <NavLink
                            to={metadata.donations.link || '/paginas/doações'}
                            data-role="link"
                            className={classes.link}
                            activeClassName={classes.activeLink}
                            exact
                        >
                            {metadata.donations.name || 'Doações'}
                        </NavLink>
                    </li>
                    <li className={classes.menuItem}>
                        <NavLink
                            to={metadata.contact.link || '/paginas/contato'}
                            data-role="link"
                            className={classes.link}
                            activeClassName={classes.activeLink}
                            exact
                        >
                            {metadata.contact.name || 'Contato'}
                        </NavLink>
                    </li>
                </Panel>
            </Holder>
        );
    }
}

Menu = jss({
    menuHolder: {
        background: 'rgba(255, 255, 255, .9)',
        zIndex: 10
    },
    menu: {
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
    articles: {
        display: 'flex',
        alignItems: 'center'
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
    },
    items: {
        position: 'relative',
        listStyle: 'none',
        margin: 0,
        // padding: '10px',
        display: 'flex',
        padding: 0,
        flexDirection: 'column',
        alignItems: 'center',
        width: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        width: '350px'
    },
    li: {
        paddingLeft: '30px',
        justifyContent: 'space-between',
        '&:hover > [data-role="title"]': {
            transform: 'scale(1.1)'
        }
    }
})(Menu);

const mapStateToProps = (state) => ({
    articles: (state.getIn(['articles', 'list']) || {}).article || [],
    metadata: (() => {
        const { about, donations, contact } = state.getIn(['articles', 'list']) || {};

        return {
            about: about || {},
            donations: donations || {},
            contact: contact || {}
        };
    })(),
    loading: state.getIn(['articles', 'loading'], false),
});

const mapDispatchToProps = {
    getList
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o })

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);