import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import jss from 'react-jss';
import DropDown from './DropDown';

import breakpoint from '../breakpoint';

const GenericFilter = () => ({
    classes,
    data,
    selectedItem,
    onChange,
    wrapInHolder = true
}) => {
    return (
        <DropDown
            items={data}
            selectedValue={selectedItem}
            onSelectedValueChanged={(state) => onChange(state)}
        />
    );
};


const CreateGenericFilter = () => jss({
    holder: {
        width: '100%',
        display: 'flex',
        height: '75px',
        justifyContent: 'flex-start',
        [`@media (max-width: ${breakpoint}px)`]: {
            height: '50px'
        }
    }
})(GenericFilter());

export const createBoundFilter = (modelName, metadataKey, selectedKey, selectFunctionName) => {
    const basePath = modelName.toLowerCase();

    const mapStateToProps = (state) => ({
        data: state.getIn([basePath, metadataKey], new List()),
        selectedItem: state.getIn([basePath, selectedKey], 'all')
    });

    const onChange = require(`../redux/${modelName}`)[selectFunctionName];

    const mapDispatchToProps = { onChange };

    const mergeProps = (s, d, o) => ({ ...s, ...d, ...o });

    return connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateGenericFilter());
};

export const StateFilter = (modelName) => createBoundFilter(modelName, 'states', 'selectedState', 'selectState');
export const MonthFilter = (modelName) => createBoundFilter(modelName, 'months', 'selectedMonth', 'selectMonth');
export const CityFilter = (modelName) => createBoundFilter(modelName, 'cities', 'selectedCity', 'selectCity');
export const TypeFilter = (modelName) => createBoundFilter(modelName, 'types', 'selectedType', 'selectType');