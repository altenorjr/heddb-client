import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';

import { states as statesDefinition } from '../definitions/state';
import { bands as bandsDefinition } from '../definitions/band';

import DropDown from './DropDown';
import Bands from './Bands';
import FilteredContainer from './FilteredContainer';

import { bandStates, filterBands } from '../data';

class UglyBrazilianBlues extends PureComponent {
    static propTypes = {
        states: statesDefinition,
        selectedState: PropTypes.string.isRequired,
        onSelectedStateChanged: PropTypes.func.isRequired,
        bands: bandsDefinition
    }

    static defaultProps = {
        selectedState: 'all'
    }

    groupedBands = () => this.props.states.filter(s => s.value !== 'all').map(({ text, value }) => ({
        title: text,
        bands: this.props.bands.filter(band => band.location.state === value)
    }));

    render = () => {
        const {
            states,
            selectedState,
            onSelectedStateChanged,
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
                        onSelectedValueChanged={(state) => onSelectedStateChanged(state)}
                    />
                ]}>
                {
                    selectedState !== 'all' && (
                        <Bands
                            className={classes.bands}
                            bands={bands} />

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
                                    bands={bands} />
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

export default BrazilianBlues;

export class BrazilianBluesConnected extends PureComponent {
    state = {
        selectedState: 'all'
    }

    selectedStateChanged = (value) => this.setState(() => ({ selectedState: value }));

    render = () => {
        const { selectedState } = this.state;

        return (
            <BrazilianBlues
                states={bandStates()}
                onSelectedStateChanged={this.selectedStateChanged}
                selectedState={selectedState}
                bands={filterBands(selectedState)} />
        );
    }
}