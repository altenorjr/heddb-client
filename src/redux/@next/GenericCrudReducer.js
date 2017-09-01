const Parse = require('parse');
const { List, fromJS } = require('immutable');
const { combineReducers } = require('redux-immutable');

const { listAll, getById, remove } = require('../../parse/util');

module.exports = (parseClassName, { convert, reducers = {}, actions = {} }) => {
    const Class = Parse.Object.extend(parseClassName);

    const classLC = parseClassName.toLowerCase();
    const classUC = classLC.toUpperCase()

    const exports = {};

    exports.GET_RECORDS_START = `@client/${classLC}/GET_${classUC}_START`
    exports.GET_RECORDS_SUCCESS = `@client/${classLC}/GET_${classUC}_SUCCESS`
    exports.SAVE_RECORD_START = `@client/${classLC}/SAVE_${classUC}_START`;
    exports.SAVE_RECORD_SUCCESS = `@client/${classLC}/SAVE_${classUC}_SUCCESS`;
    exports.SET_EDITING_ITEM = `@client/${classLC}/SET_EDITING_${classUC}`;
    exports.SET_DELETING_ITEM = `@client/${classLC}/SET_DELETING_${classUC}`;

    exports.loadRecords = () => (dispatch) => {
        dispatch({ type: exports.GET_RECORDS_START });

        return listAll(Class).then(result => dispatch({
            type: exports.GET_RECORDS_SUCCESS,
            data: fromJS(result.map(t => t.toJSON()))
        }))
    }

    exports.saveRecord = (objectId, state) => (dispatch) => {
        dispatch({ type: exports.SAVE_RECORD_START });

        if (!objectId) {
            return convert(new Class(), state)
                .then(object => object.save())
                .then(() => dispatch({ type: exports.SAVE_RECORD_SUCCESS }));
        }
        else {
            return getById(Class, objectId)
                .then(object => convert(object, state))
                .then(object => object.save())
                .then(() => dispatch({ type: exports.SAVE_RECORD_SUCCESS }));
        }
    }

    exports.requestEdition = (item) => (dispatch) => Promise.resolve(dispatch({ type: exports.SET_EDITING_ITEM, item }));
    exports.requestDeletion = (item) => (dispatch) => Promise.resolve(dispatch({ type: exports.SET_DELETING_ITEM, item }));
    exports.deleteRecord = (id) => (dispatch) => {
        dispatch({ type: exports.SAVE_RECORD_START })
        
        return remove(Class, id)
            .then((r) => Promise.all([r, dispatch({ type: exports.SAVE_RECORD_SUCCESS })]))
            .then(([r]) => r)
    }

    const data = (state = new List(), { type, data }) => {
        switch (type) {
            case exports.GET_RECORDS_SUCCESS:
                return data;
            default:
                return state;
        }
    }

    const loading = (state = false, { type }) => {
        switch (type) {
            case exports.GET_RECORDS_START:
            case exports.SAVE_RECORD_START:
                return true;
            case exports.GET_RECORDS_SUCCESS:
            case exports.SAVE_RECORD_SUCCESS:
                return false;
            default:
                return state;
        }
    }

    const editingItem = (state = null, { type, item }) => {
        switch (type) {
            case exports.SET_EDITING_ITEM:
                return item;
            default:
                return state;
        }
    }

    const deletingItem = (state = null, { type, item }) => {
        switch (type) {
            case exports.SET_DELETING_ITEM:
                return item;
            default:
                return state;
        }
    }

    exports['default'] = combineReducers({
        loading,
        data,
        editingItem,
        deletingItem,
        ...reducers
    });

    return Object.assign(exports['default'], exports, { ...actions });
}