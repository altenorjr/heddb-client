const Parse = require('parse');
const { List, fromJS } = require('immutable');
const GenericCrudReducer = require('./@next/GenericCrudReducer');

const { setFields } = require('../parse/util');
const { getHtmlFromState } = require('../components/@next/RichTextEditor');

const SET_FILTER_TYPE = `@client/articles/SET_FILTER_TYPE`;
const GET_LINK_START = `@client/articles/GET_LINK_START`;
const GET_LIST_START = `@client/articles/GET_LIST_START`;
const GET_LINK_SUCCESS = `@client/articles/GET_LINK_SUCCESS`;
const GET_LIST_SUCCESS = `@client/articles/GET_LIST_SUCCESS`;

const convert = (object, state) => new Promise((resolve) => {
    const { data } = state;

    let content = data.get('content', '');
    let type = data.get('type', 'article');

    if (typeof content !== 'string') {
        content = getHtmlFromState(content);
    }

    const newData = data.set('content', content).set('type', type).toJS();

    resolve(setFields(object, newData, ['type', 'name', 'link', 'content']))
});

const selectedType = (state = 'all', { type, selectedType }) => {
    switch (type) {
        case SET_FILTER_TYPE:
            return selectedType;
        default:
            return state;
    }
};

const currentPage = (state = null, { type, data }) => {
    switch (type) {
        case GET_LINK_SUCCESS:
            return data;
        default:
            return state;
    }
};

const list = (state = null, { type, data }) => {
    switch (type) {
        case GET_LIST_SUCCESS:
            return data;
        default:
            return state;
    }
};

const types = (state = new List(), { type, metadata }) => {
    switch (type) {
        case result.GET_RECORDS_SUCCESS:
            return metadata.types;
        default:
            return state;
    }
}

const loading = (state = false, { type }) => {
    switch (type) {
        case result.GET_RECORDS_START:
        case result.SAVE_RECORDS_START:
        case GET_LINK_START:
        case GET_LIST_START:
        return true;
        case result.GET_RECORDS_SUCCESS:
        case result.SAVE_RECORDS_SUCCESS:
        case GET_LINK_SUCCESS:
        case GET_LIST_SUCCESS:
            return false;
        default:
            return state;
    }
}

const selectType = (selectedType, forceFilter = true) => (dispatch, getState) => {
    dispatch({ type: SET_FILTER_TYPE, selectedType });

    if (forceFilter) {
        filterArticles({ selectedType })(dispatch, getState);
    }
}

const filterArticles = (filters = {}) => (dispatch, getState) => {
    dispatch({ type: result.GET_RECORDS_START });

    const {
        type = 'all',
        loadMetadata = true
    } = filters

    const componentState = getState();

    const selectedType = type || componentState.getIn(['articles', 'selectedType']) || 'all'

    const hasTypes = !!componentState.getIn(['articles', 'types']);

    const shouldLoadMetadata = typeof loadMetadata === 'boolean' ? loadMetadata : !hasTypes;

    return Parse.Cloud.run('filterArticles', {
        type: selectedType,
        shouldLoadMetadata
    })
        .then(({ articles, types }) => {
            const action = {
                type: result.GET_RECORDS_SUCCESS,
                data: fromJS(articles.map(article => article.toJSON())),
                metadata: {}
            }

            if (shouldLoadMetadata) {
                action.metadata.types = types;
            }

            dispatch(action);
        })
}

const findArticleByLink = (link) => (dispatch, getState) => {
    if (!link) {
        return dispatch({
            type: GET_LINK_SUCCESS,
            data: null
        })
    }

    dispatch({ type: GET_LINK_START });

    return Parse.Cloud.run('findArticleByLink', { link })
        .then((result) => dispatch({
            type: GET_LINK_SUCCESS,
            data: result.toJSON()
        }))
}

const getList = () => (dispatch, getState) => {
    dispatch({ type: GET_LIST_START });

    Parse.Cloud.run('getArticleList')
        .then((result) => dispatch({
            type: GET_LIST_SUCCESS,
            data: result
        }))
}

const result = GenericCrudReducer('Articles', {
    convert,
    actions: {
        SET_FILTER_TYPE,
        GET_LINK_START,
        GET_LINK_SUCCESS,
        GET_LIST_START,
        GET_LIST_SUCCESS,
        selectType,
        filterArticles,
        findArticleByLink,
        getList
    },
    reducers: {
        selectedType,
        types,
        loading,
        currentPage,
        list
    }
})

module.exports = result;