import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import cx from 'classnames';
import { List } from 'immutable';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import Bands from './Bands';
import FilteredContainer from './FilteredContainer';
import { createBoundFilter } from './GenericFilter';

import breakpoint, { vertical as verticalBreakpoint } from '../breakpoint';

import {
    selectState,
    filterBands
} from '../redux/Bands';

const StatesFilter = createBoundFilter('Bands', 'states', 'selectedState', 'selectState');

class BrazilianBlues extends PureComponent {
    static propTypes = {
        states: PropTypes.instanceOf(List),
        bands: PropTypes.instanceOf(List),
        selectedState: PropTypes.string.isRequired,
        selectState: PropTypes.func.isRequired,
        filterBands: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    }

    static defaultProps = {
        selectedState: 'all'
    }

    componentDidMount = () => this.props.filterBands({ state: 'all' });

    groupedBands = () => this.props.states.filter(s => s.get('value') !== 'all').map((state) => ({
        title: state.get('text'),
        bands: this.props.bands.filter(band => band.get('state') === state.get('value'))
    }));

    render = () => {
        const {
            selectedState,
            bands,
            loading,
            classes
        } = this.props;

        if (loading) {
            return (
                <RefreshIndicator top={250} left={(window.innerWidth / 2) - 20} status="loading" style={{zIndex: 99999}} />
            );
        }

        return (
            <FilteredContainer
                autoPadding={selectedState !== 'all'}
                filters={[
                    <StatesFilter />
                ]}>
                {
                    selectedState !== 'all' && (
                        <Bands
                            className={classes.bands}
                            bands={bands}
                            showStateInformation
                        />

                    )
                }
                {
                    selectedState === 'all' && (
                        this.groupedBands().map(({ title, bands }, i) => (
                            <div key={i} className={cx(classes.bands, classes.all)}>
                                <h1 className={cx(classes.title, `nth-${i}`)}>{title}</h1>
                                <Bands
                                    title={title}
                                    className={classes.bands}
                                    bands={bands} 
                                    showStateInformation
                                />
                            </div>

                        ))
                    )
                }
            </FilteredContainer>
        );
    }
}

BrazilianBlues = jss({
    brazilianBlues: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 0'
    },
    bands: {
        width: '100%'
    },
    all: {
        marginTop: '-75px',
        [`@media (max-width: ${breakpoint}px)`]: {
            marginTop: 0
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '75px',
        margin: 0,
        padding: '0 20px',
        position: 'sticky',
        top: '200px',
        zIndex: 6,
        pointerEvents: 'none',
        [`@media (max-height: ${verticalBreakpoint}px)`]: {
            position: 'static'
        },
        [`@media (max-width: ${breakpoint}px)`]: {
            top: '146px',
            backgroundColor: 'rgba(255, 255, 255, .85)',
            zIndex: 4
        },
        '&.nth-0': {
            [`@media (max-width: ${breakpoint}px)`]: {
                top: '147px'
            }
        }
    }
})(BrazilianBlues);

const mapStateToProps = (state) => ({
    states: state.getIn(['bands', 'states'], new List()),
    bands: state.getIn(['bands', 'data'], new List()),
    selectedState: state.getIn(['bands', 'selectedState'], null),
    loading: state.getIn(['bands', 'loading'])
});

const mapDispatchToProps = {
    selectState,
    filterBands 
};

export default connect(mapStateToProps, mapDispatchToProps)(BrazilianBlues)