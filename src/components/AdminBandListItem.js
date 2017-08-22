import React from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';
import cx from 'classnames';

import LinesEllipsis from 'react-lines-ellipsis'
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

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