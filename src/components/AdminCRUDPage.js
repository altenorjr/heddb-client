import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';

import AdminPageWithTopBar from './AdminPageWithTopBar';

class AdminCRUDPage extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        onRequestAdd: PropTypes.func.isRequired,
        onCloseEditor: PropTypes.func.isRequired,
        editor: PropTypes.node.isRequired,
        editorOpen: PropTypes.bool.isRequired,
        editorWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.number.isRequired
    }

    static defaultProps = {
        editorWidth: '50%'
    }

    closeEditor = () => this.props.onCloseEditor()

    render = () => {
        const {
            title,
            editor,
            editorOpen,
            className,
            contentClassName,
            editorWidth,
        } = this.props;

        return (
            <AdminPageWithTopBar
                title={title}
                className={className}
                onRightIconClick={() => this.props.onRequestAdd()}
            >
                <Drawer
                    open={editorOpen}
                    docked={false}
                    openSecondary={true}
                    width={editorWidth}
                    onRequestChange={this.closeEditor}
                >
                    {editor}
                </Drawer>

                <div className={contentClassName}>
                    {this.props.children}
                </div>
            </AdminPageWithTopBar>
        )
    }
}

export default AdminCRUDPage;