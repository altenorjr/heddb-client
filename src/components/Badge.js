import React from 'react';
import jss from 'react-jss';
import cx from 'classnames';

const Badge = ({ className, classes, sheet, value, ...rest }) => (
    <div className={cx(className, classes.badge)} {...rest}>
        {value}
    </div>
);

export default jss({
    badge: {
        fontSize: '12px',
        // opacity: .6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: '10px',
        width: '20px',
        height: '20px'
    }
})(Badge);