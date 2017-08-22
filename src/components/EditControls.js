import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';


export default jss({
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
})(({
    className,
    classes,
    data,
    requestEdition,
    requestDeletion
}) => {
    return (
        <div className={cx(classes.actions, className)}>
            <IconButton onTouchTap={requestEdition}><EditIcon /></IconButton>
            <IconButton onTouchTap={requestDeletion} iconStyle={{ color: "#940C16" }}><DeleteIcon /></IconButton>
        </div>
    );
});