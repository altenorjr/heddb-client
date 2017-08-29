import React from 'react';
import { Map } from 'immutable';

import Event from './Event';

export default ({
    classes,
    data = new Map(),
    requestEdition,
    requestDeletion
}) => {
    return (
        <Event
            key={data.get('objectId')}
            data={data}
            requestEdition={() => requestEdition(data)}
            requestDeletion={() => requestDeletion(data)}
            showMonth
            showEventType
            showEditControls
        />
    );
};