import React from 'react';
import jss from 'react-jss';
import cx from 'classnames';

import breakpoint from '../breakpoint';

const Popover = ({children, className, contentClassName, title, classes, ...props }) => (
    <div className={cx(className, classes.popover)}>
        {title}
        <div className={cx(classes.popoverContent, contentClassName, 'popover-content')}>
            {children}
        </div>
    </div>
)

export default jss({
    popover: {
        cursor: 'pointer',
        position: 'relative',
        '&:hover .popover-content': {
            visibility: 'visible',
            opacity: 1,
            zIndex: 1,
            transform: 'translateY(0%)',
            transitionDelay: '0s, 0s, 0.3s'
        },
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    },
    popoverContent: {
        visibility: 'hidden',
        opacity: 0,
        zIndex: 1,
        transform: 'translateY(-2em)',
        position: 'absolute',
        top: '100%',
        width: ({ popoverWidth = '100%' }) => popoverWidth,
        left: 0,
        transition: 'all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s'
    }
})(Popover);