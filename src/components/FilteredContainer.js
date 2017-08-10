import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';

const UglyFilteredContainer = ({ className, autoPadding = true, filtersClassName, contentClassName, classes, filters, children }) => (
    <div className={className}>
        <Holder className={cx(classes.filterContainer, filtersClassName)}>
            <Panel className={classes.filters}>
                {filters.map((filter, i) => <div key={i}>{filter}</div>)}
            </Panel>
        </Holder>
        <Holder>
            <Panel className={cx(classes.content, contentClassName)}>
                {children}
            </Panel>
        </Holder>
    </div>
);

const FilteredContainer = jss({
    filterContainer: {
        position: 'fixed',
        top: '224px',
        zIndex: 5
    },
    filters: {
        flexDirection: 'row',
        height: '75px',
        fontSize: '24px',
        alignItems: 'center',
        justifyContent: ({ filters }) => filters.length === 1 ? 'flex-start' : 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.85)'
    },
    content: {
        paddingTop: ({ autoPadding = true }) => autoPadding ? '75px' : 0
    }
})(UglyFilteredContainer);

export default FilteredContainer;
