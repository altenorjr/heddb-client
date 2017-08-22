import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default ({
    classes,
    children,
    open,
    title = 'Atenção',
    okText = 'Ok',
    onDismiss
}) => (
    <Dialog
        title={title}
        actions={[
            <FlatButton
            label={okText}
            primary={true}
            onTouchTap={onDismiss}
            />
        ]}
        modal
        open
    >
        {children}
    </Dialog>
);