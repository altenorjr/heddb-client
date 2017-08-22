const Parse = require('parse');
const GenericCrudReducer = require('./@next/GenericCrudReducer');
const moment = require('moment');
const { List, fromJS } = require('immutable');
const { conditionalUpload, setFields, setRefs } = require('../parse/util');

const SET_FILTER_CITY = `@client/events/SET_FILTER_CITY`;
const SET_FILTER_MONTH = `@client/events/SET_FILTER_MONTH`;

const convert = (object, state) => {
    const data = state.data.toJS();

    return conditionalUpload(data.newPic, object, 'pic')
        .then(object => setFields(object, data, ['name', 'social']))
        .then(object => setRefs(object, data, { band: 'Bands', venue: 'Venues' }))
        .then(object => {
            object.set('date', new Date(data.date.iso));

            if (!data.newPic && !(data.pic || {}).url) {
                object.set('pic', null);
            }

            object.set('city', data.venue.location.city);
            object.set('state', data.venue.location.state);

            return object;
        });
};

const selectedCity = (state = 'all', { type, selectedCity }) => {
    switch (type) {
        case SET_FILTER_CITY:
            return selectedCity;
        default:
            return state;
    }
};

const selectedMonth = (state = moment().startOf('month').toISOString(), { type, selectedMonth }) => {
    switch (type) {
        case SET_FILTER_MONTH:
            return selectedMonth;
        default:
            return state;
    }
};

const cities = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return fromJS(metadata.cities) || state;
        default:
            return state;
    }
};

const months = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return fromJS(metadata.months) || state;
        default:
            return state;
    }
};

const selectCity = (selectedCity) => (dispatch, getState) => {
    dispatch({ type: SET_FILTER_CITY, selectedCity });

    filterRecords({ city: selectedCity })(dispatch, getState);
};

const selectMonth = (selectedMonth) => (dispatch, getState) => {
    dispatch({ type: SET_FILTER_MONTH, selectedMonth });

    filterRecords({ month: selectedMonth })(dispatch, getState);
};

const filterRecords = ({ city, month, loadMetadata }) => (dispatch, getState) => {
    dispatch({ type: result.GET_RECORDS_START });

    const state = getState();

    const selectedCity = city || state.getIn(['events', 'selectedCity']) || 'all';
    const selectedMonth = month || state.getIn(['events', 'selectedMonth']) || moment().startOf('month').toISOString();

    const hasCities = !!state.getIn(['events', 'cities']).size;
    const hasMonths = !!state.getIn(['events', 'months']).size;

    const shouldLoadMetadata = typeof loadMetadata === 'boolean' ? loadMetadata : (!hasCities && !hasMonths);

    return Parse.Cloud.run('filterEvents', {
        selectedMonth,
        selectedCity,
        shouldLoadMetadata
    })
        .then(({ cities, events, months }) => {
            const action = {
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS(events.map(event => event.toJSON())),
                metadata: {}
            };

            if (shouldLoadMetadata) {
                action.metadata.cities = cities;
                action.metadata.months = months;
            }

            dispatch(action);
        })
        .catch(console.warn);
};

const result = GenericCrudReducer('Events', {
    convert,
    reducers: {
        selectedCity,
        selectedMonth,
        cities,
        months
    },
    actions: {
        SET_FILTER_CITY,
        SET_FILTER_MONTH,
        selectCity,
        selectMonth,
        filterRecords
    }
});

module.exports = result;