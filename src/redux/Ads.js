const Parse = require('parse');
const { fromJS } = require('immutable');
const GenericCrudReducer = require('./@next/GenericCrudReducer');
const { setFields } = require('../parse/util');

const convert = (object, state) => new Promise((resolve) => {
    const data = state.data.toJS();

    resolve(setFields(object, data, ['location', 'name', 'image']));
})

const banner = (state = [], { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.banner;
        default:
            return state;
    }
};

const sidebar = (state = [], { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.sidebar;
        default:
            return state;
    }
};

const highlights = (state = [], { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.highlights;
        default:
            return state;
    }
};

const getAds = () => (dispatch, getState) => {
    dispatch({ type: result.GET_RECORDS_START });

    return Parse.Cloud.run('getMktItems')
        .then(({ banner, sidebar, highlights }) => {
            dispatch({
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS([ ...banner, ...sidebar, ...highlights ]),
                metadata: {
                    banner,
                    sidebar,
                    highlights
                }
            });
        })
        .catch(console.warn);
};

const result = GenericCrudReducer('Ads', {
    convert,
    actions: {
        getAds
    },
    reducers: {
        banner,
        sidebar,
        highlights
    }
});

module.exports = result;