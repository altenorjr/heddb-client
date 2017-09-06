import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';
import breakpoint from '../breakpoint';

const Panel = ({ children, sheet, classes, element = 'div', className, ...rest }) => (
    React.createElement(element, {
        className: cx(classes.panel, className),
        ...rest
    }, children)
);

const styles = {
    panel: {
        width: '90%',
        maxWidth: '1600px',
        minWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%',
            minWidth: '100%'
        }
    }
};

export default jss(styles)(Panel);