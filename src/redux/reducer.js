import { combineReducers } from 'redux-immutable';

import authentication from './authentication';
import dimensions from './dimensions';
import drawer from './drawer';
import bands from './Bands';
import events from './Events';
import venues from './Venues';
import articles from './Articles';
import ads from './Ads';

const reducer = combineReducers({
    authentication,
    dimensions,
    drawer,
    bands,
    events,
    venues,
    articles,
    ads
});

export default reducer;
