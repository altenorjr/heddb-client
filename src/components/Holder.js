import React from 'react';
import injectSheet from 'react-jss';
import cx from 'classnames';

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
        alignItems: 'center'
    }
};

export default injectSheet(styles)(Holder);