import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

let args = applyMiddleware(thunkMiddleware);

if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension');

    args = composeWithDevTools(args);
}

const store = createStore(reducer, args);

// const { loadRecords: loadEvents } = require('./Events');

// store.dispatch(loadEvents());

export default store;