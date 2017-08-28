import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import FilterPanel from './FilterPanel';

const FilteredContainer = jss({
    filterContainer: {
        position: 'fixed',
        top: '224px',
        zIndex: 5
    },
    content: {
        paddingTop: ({ autoPadding = true }) => autoPadding ? '75px' : 0
    }
})(({
    className,
    autoPadding = true,
    filtersClassName,
    contentClassName,
    classes,
    filters = [],
    children
}) => {
    return (
        <div className={className}>
            {
                !!filters.length && (
                    <Holder className={cx(classes.filterContainer, filtersClassName)}>
                        <Panel className={classes.filters}>
                            <FilterPanel {...{ filters, autoPadding }} />
                        </Panel>
                    </Holder>

                )
            }
            <Holder>
                <Panel className={cx(classes.content, contentClassName)}>
                    {children}
                </Panel>
            </Holder>
        </div>
    );
});

export default FilteredContainer;
