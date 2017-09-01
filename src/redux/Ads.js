const Parse = require('parse');
const { List, fromJS } = require('immutable');
const GenericCrudReducer = require('./@next/GenericCrudReducer');
const { conditionalUpload, setFields } = require('../parse/util');

const convert = (object, state) => {
    state.data = state.data.set('location', state.data.get('location', 'sidebar'));

    return conditionalUpload(state.data.get('newPic'), object, 'image')
        .then(object => setFields(object, state.data.toJS(), ['name', 'link', 'location']));
}


const banner = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.banner;
        default:
            return state;
    }
};

const sidebar = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.sidebar;
        default:
            return state;
    }
};

const highlights = (state = new List(), { type, metadata }) => {
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
            banner = banner.map(({ image, ...ad }) => ({ image: image.toJSON(), ...ad }));
            sidebar = sidebar.map(({ image, ...ad }) => ({ image: image.toJSON(), ...ad }));
            highlights = highlights.map(({ image, ...ad }) => ({ image: image.toJSON(), ...ad }));

            dispatch({
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS([...banner, ...sidebar, ...highlights]),
                metadata: {
                    banner: fromJS(banner),
                    sidebar: fromJS(sidebar),
                    highlights: fromJS(highlights)
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