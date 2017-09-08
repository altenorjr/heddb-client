import React, { Component } from 'react';
import jss from 'react-jss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { List } from 'immutable';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import breakpoint from '../breakpoint';

import Popover from './Popover';
import Badge from './Badge';

const listOptions = (values, selectedValue) => values.filter((obj) => obj.get('value') !== selectedValue);

const findSelectedValueText = (values, selectedValue) => {
    return (values.find((obj) => obj.get('value') === selectedValue) || new Map()).get('text', '');
}

class DropDown extends Component {
    static propTypes = {
        items: PropTypes.instanceOf(List),
        selectedValue: PropTypes.string.isRequired,
        onSelectedValueChanged: PropTypes.func.isRequired,
        align: PropTypes.oneOf(['left', 'center', 'right'])
    }

    static defaultProps = {
        align: 'left'
    }

    render = () => {
        const {
            className,
            items,
            classes,
            selectedValue,
            onSelectedValueChanged
        } = this.props;

        return (
            <Popover
                className={cx(className, classes.dropdown)}
                title={(
                    <div className={cx(classes.item, classes.selectedItemHolder)}>
                        <ArrowDownIcon className={classes.arrowDown} />
                        <span className={cx(classes.selectedItem, classes.title)}>
                            &nbsp;{findSelectedValueText(items, selectedValue)}&nbsp;
                        </span>
                    </div>
                )}
            >
                <ul className={classes.items}>
                    {
                        listOptions(items, selectedValue).map((item, i) => {
                            const value = item.get('value');
                            const text = item.get('text');
                            const count = item.get('count');

                            return (
                                <li
                                    onTouchTap={() => onSelectedValueChanged(value)}
                                    className={cx(classes.item, classes.li)}
                                    key={i}
                                >
                                    <div data-role="title" className={classes.title}>{text}</div>
                                    <Badge className={classes.badge} value={count} />
                                </li>
                            );
                        })
                    }
                </ul>
            </Popover>
        );
    }
}

export default jss({
    items: {
        position: 'relative',
        listStyle: 'none',
        margin: 0,
        // padding: '10px',
        display: 'flex',
        padding: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 'auto',
        backgroundColor: 'rgba(255, 255, 255, .95)'
    },
    selectedItemHolder: {
        justifyContent: ({ align }) => align === 'center' ? 'center' : `flex-${align === 'left' ? 'start' : 'end'}`,
        backgroundColor: 'transparent !important'
    },
    selectedItem: {
        order: ({ align }) => align !== 'right' ? 0 : 1
    },
    arrowDown: {
        order: ({ align }) => align !== 'right' ? 1 : 0
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        width: '350px',
        backgroundColor: 'rgba(255, 255, 255, .95)',
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
    },
    title: {
        fontSize: '24px',
        transform: 'scale(1)',
        transition: '.3s',
        order: ({ align }) => align !== 'right' ? 0 : 1
    },
    badge: {
        order: ({ align }) => align !== 'right' ? 1 : 0
    }
})(DropDown);