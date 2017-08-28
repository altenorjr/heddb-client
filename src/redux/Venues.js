const Parse = require('parse');
const { List, fromJS } = require('immutable');
const GenericCrudReducer = require('./@next/GenericCrudReducer');
const { defaultTransformation, setFields } = require('../parse/util');

const convert = (object, state) => defaultTransformation(object, state)
    .then(object => setFields(object, state.data.toJS(), ['phone', 'address']));

const SET_FILTER_STATE = `@client/venues/SET_FILTER_STATE`;

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

    filterVenues({ state })(dispatch, getState);
};

const filterVenues = (filters = {}) => (dispatch, getState) => {
    dispatch({ type: result.GET_RECORDS_START });

    const {
        state,
        loadMetadata
    } = filters;

    const componentState = getState();

    const selectedState = state || componentState.getIn(['events', 'selectedState']) || 'all';

    const hasStates = !!componentState.getIn(['events', 'states'], new List()).size;

    const shouldLoadMetadata = typeof loadMetadata === 'boolean' ? loadMetadata : !hasStates;

    return Parse.Cloud.run('filterVenues', {
        state: selectedState,
        shouldLoadMetadata
    })
        .then(({ states, venues }) => {
            const action = {
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS(venues.map(venue => venue.toJSON())),
                metadata: {}
            };

            if (shouldLoadMetadata) {
                action.metadata.states = states;
            }

            dispatch(action);
        })
        .catch(console.warn);
};

const result = GenericCrudReducer('Venues', {
    convert,
    actions: {
        SET_FILTER_STATE,
        selectState,
        filterVenues
    },
    reducers: {
        selectedState,
        states
    }
});

module.exports = result;