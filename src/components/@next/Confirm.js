import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default ({
    classes,
    children,
    title = 'Atenção',
    okText = 'Ok',
    cancelText = 'Cancelar',
    onConfirm,
    onDismiss
}) => (
    <Dialog
        title={title}
        actions={[
            <FlatButton
                label={cancelText}
                primary={true}
                onTouchTap={onDismiss}
            />,
            <FlatButton
                label={okText}
                onTouchTap={onConfirm}
            />,
        ]}
        modal
        open
    >
        {children}
    </Dialog>
);