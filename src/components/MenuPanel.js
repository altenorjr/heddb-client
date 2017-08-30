import React, { Component } from 'react';
import jss from 'react-jss';

const MenuPanel = ({ classes, items }) => {
    return (
        <ul className={classes.items}>
            {
                items.map((item, i) => {
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
    );
}

export default jss({
    items: {
        position: 'relative',
        listStyle: 'none',
        margin: 0,
        display: 'flex',
        padding: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 'auto',
        backgroundColor: 'rgba(255, 255, 255, .95)'
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
})(MenuPanel);