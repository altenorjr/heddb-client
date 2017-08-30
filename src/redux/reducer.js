import { combineReducers } from 'redux-immutable';

import authentication from './authentication';
import dimensions from './dimensions';
import drawer from './drawer';
import bands from './Bands';
import events from './Events';
import venues from './Venues';
import articles from './Articles';

const reducer = combineReducers({
    authentication,
    dimensions,
    drawer,
    bands,
    events,
    venues,
    articles
});

export default reducer;
