import React from 'react';
import { Map } from 'immutable';

import Band from './Band';

export default ({
    classes,
    data = new Map(),
    requestEdition,
    requestDeletion
}) => {
    return (
        <Band 
            data={data} 
            requestEdition={() => requestEdition(data)} 
            requestDeletion={() => requestDeletion(data)} 
            showEditControls 
            showStateInformation
        />
    )
};