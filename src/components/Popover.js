import React from 'react';
import jss from 'react-jss';
import cx from 'classnames';

const UglyPopover = ({children, className, contentClassName, title, classes, ...props }) => (
    <div className={cx(className, classes.popover)}>
        {title}
        <div data-role="popover-content" className={cx(classes.popoverContent, contentClassName)}>
            {children}
        </div>
    </div>
)

const Popover = jss({
    popover: {
        cursor: 'pointer',
        position: 'relative',
        '&:hover [data-role="popover-content"]': {
            visibility: 'visible',
            opacity: 1,
            zIndex: 0,
            transform: 'translateY(0%)',
            transitionDelay: '0s, 0s, 0.3s'
        }
    },
    popoverContent: {
        visibility: 'hidden',
        opacity: 1,
        zIndex: -1,
        // transform: 'translateY(-2em)',
        position: 'absolute',
        top: '100%',
        width: ({ popoverWidth = '100%' }) => popoverWidth,
        left: 0,
        transition: 'all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s'
    }
})(UglyPopover);

export default Popover;