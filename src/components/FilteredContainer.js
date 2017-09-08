import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import FilterPanel from './FilterPanel';

import breakpoint, { vertical as verticalBreakpoint } from '../breakpoint';

class FilteredContainer extends PureComponent {
    render = () => {
        const {
            className,
            autoPadding = true,
            filtersClassName,
            contentClassName,
            classes,
            // loading,
            filters = [],
            children
        } = this.props;

        return (
            <div className={className}>
                {
                    !!filters.length && (
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
    }
}

FilteredContainer = jss({
    filterContainer: {
        position: ({ height }) => height > verticalBreakpoint ? 'sticky' : 'static',
        top: ({ width, height }) => width > breakpoint ? '198px' : height > verticalBreakpoint ? '100px' : '0',
        zIndex: ({ height }) => height > verticalBreakpoint ? 5 : 0,
        [`@media (max-width: ${breakpoint}px)`]: {
            height: ({ filters }) => `${filters.length * 50}px`
        }
    },
    content: {
        paddingTop: 0,
        [`@media (max-width: ${breakpoint}px)`]: {
            paddingTop: '0 !important',
            marginTop: 0
        }
    }
})(FilteredContainer);

export default connect(state => ({
    width: state.getIn(['dimensions', 'width']),
    height: state.getIn(['dimensions', 'height']),
    portrait: state.getIn(['dimensions', 'portrait']),
}))(FilteredContainer);