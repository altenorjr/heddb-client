import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import jss from 'react-jss';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Panel from './Panel';
import Holder from './Holder';
import Popover from './Popover';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import breakpoint from '../breakpoint';

import { getList } from '../redux/Articles';

import { websitePaths } from '../paths';

class Menu extends PureComponent {
    componentDidMount = this.props.getList();

    // shouldComponentUpdate = (next) => {
    //     const should = next.location.pathname !== this.props.location.pathname;

    //     console.log({
    //         should,
    //         next: next,
    //         current: this.props,
    //         nextPathName: next.location.pathname,
    //         currentPathName: this.props.location.pathname
    //     });

    //     return true;
    // }

    render = () => {
        const {
            classes,
            articles,
            onItemSelected = () => { },
            pages
        } = this.props;

        return (
            <Holder className={classes.menuHolder}>
                <Panel className={cx(classes.menu, "accent-font")} element="ul">
                    <li className={classes.menuItem}>
                        <NavLink
                            onTouchTap={() => onItemSelected()}
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
                                    onTouchTap={() => onItemSelected()}
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
                            title={({ open }) => (
                                <div className={classes.articles}>
                                    Artigos
                                    {
                                        !open && <ArrowDownIcon />
                                    }
                                    {
                                        open && <ArrowUpIcon />
                                    }
                                </div>
                            )}
                        >
                            <ul className={classes.items}>
                                {
                                    articles.map((page, i) => (
                                        <li
                                            className={cx(classes.item, classes.li)}
                                            key={i}
                                        >
                                            <NavLink
                                                onTouchTap={() => onItemSelected()}
                                                to={page.get('link')}
                                                className={classes.link}
                                                activeClassName={classes.activeLink}
                                            >
                                                {page.get('name')}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Popover>
                    </li>
                    {
                        pages.map((page, i) => (
                            <li key={page.get('link', i)} className={classes.menuItem} >
                                <NavLink
                                    onTouchTap={() => onItemSelected()}
                                    to={page.get('link')}
                                    data-role="link"
                                    className={classes.link}
                                    activeClassName={classes.activeLink}
                                    exact
                                >
                                    {page.get('name')}
                                </NavLink>
                            </li>
                        ))
                    }
                </Panel>
            </Holder>
        );
    }
}

Menu = jss({
    menuHolder: {
        background: 'rgba(255, 255, 255, .9)',
        zIndex: 10,
        [`@media (max-width: ${breakpoint}px)`]: {
            // height: '100vh'
        }
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
        margin: 0,
        [`@media (max-width: ${breakpoint}px)`]: {
            flexDirection: 'column',
            height: 'auto',
            justifyContent: 'flex-start',
            borderBottom: 0
        }
    },
    menuItem: {
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '30px',
        color: '#666',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    },
    articles: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFF'
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
        width: '350px',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    },
    li: {
        paddingLeft: '30px',
        justifyContent: 'space-between',
        '&:hover > [data-role="title"]': {
            transform: 'scale(1.1)'
        }
    }
})(Menu);

const mapStateToProps = (state, ownProps) => ({
    articles: state.getIn(['articles', 'list', 'article'], new List()),
    pages: state.getIn(['articles', 'list', 'page'], new List()),
    loading: state.getIn(['articles', 'loading'], false)
});

const mapDispatchToProps = {
    getList
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o })

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);