import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { List } from 'immutable';

import DropDown from './DropDown';
import Bands from './Bands';
import FilteredContainer from './FilteredContainer';

import {
    selectState,
    filterRecords
} from '../redux/Bands';

class UglyBrazilianBlues extends PureComponent {
    static propTypes = {
        states: PropTypes.instanceOf(List),
        bands: PropTypes.instanceOf(List),
        selectedState: PropTypes.string.isRequired,
        selectState: PropTypes.func.isRequired,
        filterRecords: PropTypes.func.isRequired
    }

    static defaultProps = {
        selectedState: 'all'
    }

    componentDidMount = () => this.props.filterRecords({ state: 'all' });

    groupedBands = () => this.props.states.filter(s => s.get('value') !== 'all').map((state) => ({
        title: state.get('text'),
        bands: this.props.bands.filter(band => band.get('state') === state.get('value'))
    }));

    render = () => {
        const {
            states,
            selectedState,
            selectState,
            bands,
            classes
        } = this.props;

        return (
            <FilteredContainer
                autoPadding={selectedState !== 'all'}
                filters={[
                    <DropDown
                        items={states}
                        selectedValue={selectedState}
                        onSelectedValueChanged={(state) => selectState(state)}
                    />
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
                            <div key={i}>
                                <h1 className={classes.title}>{title}</h1>
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

const styles = {
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
    title: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '75px',
        margin: 0,
        padding: '0 20px',
        position: 'sticky',
        top: '225px',
        zIndex: 6,
        pointerEvents: 'none'
    }
};


const BrazilianBlues = jss(styles)(UglyBrazilianBlues);

const mapStateToProps = (state) => ({
    states: state.getIn(['bands', 'states'], new List()),
    bands: state.getIn(['bands', 'data'], new List()),
    selectedState: state.getIn(['bands', 'selectedState'], null)
});

const mapDispatchToProps = {
    selectState,
    filterRecords 
};

export default connect(mapStateToProps, mapDispatchToProps)(BrazilianBlues)