import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import FilterPanel from './FilterPanel';

import breakpoint from '../breakpoint';

const FilteredContainer = jss({
    filterContainer: {
        position: 'fixed',
        top: '198px',
        zIndex: 5,
        [`@media (max-width: ${breakpoint}px)`]: {
            position: 'static',
            zIndex: 0
        }
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
    loading,
    filters = [],
    children
}) => {
    return (
        <div className={className}>
            {
                !!filters.length && !loading && (
                    <Holder className={cx(classes.filterContainer, filtersClassName)}>
                        <Panel className={classes.filters}>
                            <FilterPanel fixed={false} {...{ filters, autoPadding }} />
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
