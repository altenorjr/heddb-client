import React from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';

import Event from './Event';

export default jss({
    item: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        background: '#EEEEEE',
        padding: '10px',
        width: '100%',
        margin: '10px 0'
    },
    info: {
        display: 'flex'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '0 30px 0 10px'
    },
    name: {

    },
    picHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pic: {
        width: '100px',
        height: '100px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // borderRadius: '50px'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    description: {
        flexBasis: '50%',
        display: 'flex',
        alignItems: 'center'
    }
})(({
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
            showEditControls
        />
    )
});