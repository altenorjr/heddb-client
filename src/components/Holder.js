import React from 'react';
import injectSheet from 'react-jss';
import cx from 'classnames';
import breakpoint from '../breakpoint';

const Holder = ({ children, classes, sheet, className, ...rest }) => (
    <div className={cx(classes.holder, className)} {...rest}>
        {children}
    </div>
);

const styles = {
    holder: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    }
};

export default injectSheet(styles)(Holder);