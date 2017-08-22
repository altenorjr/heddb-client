const Parse = require('parse');
const { List, fromJS } = require('immutable');
const GenericCrudReducer = require('./@next/GenericCrudReducer');
const { defaultTransformation } = require('../parse/util');

const SET_FILTER_STATE = `@client/bands/SET_FILTER_STATE`;

const selectedState = (lastState = 'all', { type, state }) => {
    switch (type) {
        case SET_FILTER_STATE:
            return state;
        default:
            return lastState;
    }
};

const states = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return fromJS(metadata.states) || state;
        default:
            return state;
    }
}

const selectState = (state) => (dispatch, getState) => {
    dispatch({ type: SET_FILTER_STATE, state });

    filterRecords({ state })(dispatch, getState);
};

const filterRecords = (filters = {}) => (dispatch, getState) => {
    dispatch({ type: result.GET_RECORDS_START });

    const {
        state,
        loadMetadata
    } = filters;

    const componentState = getState();

    const selectedState = state || componentState.getIn(['bands', 'selectedState']) || 'all';

    const hasStates = !!componentState.getIn(['bands', 'states'], new List()).size;

    const shouldLoadMetadata = typeof loadMetadata === 'boolean' ? loadMetadata : !hasStates;

    return Parse.Cloud.run('filterBands', {
        state: selectedState,
        shouldLoadMetadata
    })
        .then(({ states, bands }) => {
            const action = {
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS(bands.map(band => band.toJSON())),
                metadata: {}
            };

            if (shouldLoadMetadata) {
                action.metadata.states = states;
            }

            dispatch(action);
        })
        .catch(console.warn);
};

const result = GenericCrudReducer('Bands', {
    convert: defaultTransformation,
    actions: {
        SET_FILTER_STATE,
        selectState,
        filterRecords
    },
    reducers: {
        selectedState,
        states
    }
});

module.exports = result;