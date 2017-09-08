import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import breakpoint from '../breakpoint';

const FilterPanel = ({
    className,
    classes,
    adminMode = false,
    fixed = true,
    filters = []
}) => {
    if (!filters || (Array.isArray(filters) && !filters.length)) {
        return (<div />);
    }

    return (
        <div className={cx(className, classes.filters)}>
            {
                !!filters.length &&
                filters.map((filter, i) => <div className={classes.filter} key={i}>{filter}</div>)
            }
        </div>
    );
};

export default jss({
    filters: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        height: '75px',
        fontSize: '24px',
        alignItems: 'center',
        justifyContent: ({ filters, adminMode }) => adminMode || filters.length === 1 ? 'flex-start' : 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        position: ({ fixed }) => fixed ? 'fixed' : 'static',
        top: ({ top = '224px' }) => top,
        zIndex: 90,
        [`@media (max-width: ${breakpoint}px)`]: {
            flexWrap: 'wrap',
            zIndex: 0,
            justifyContent: 'space-between',
            width: '100%',
            height: 'auto'
        }
    },
    filter: {
        // width: '150px',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    }
})(FilterPanel);