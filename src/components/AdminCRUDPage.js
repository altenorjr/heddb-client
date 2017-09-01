import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import jss from 'react-jss';
import Drawer from 'material-ui/Drawer';

import AdminPageWithTopBar from './AdminPageWithTopBar';

class AdminCRUDPageUgly extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        onRequestAdd: PropTypes.func.isRequired,
        onCloseEditor: PropTypes.func.isRequired,
        editor: PropTypes.node.isRequired,
        editorOpen: PropTypes.bool.isRequired,
        editorWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
            classes
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

                <div className={cx(classes.body, contentClassName)}>
                    {this.props.children}
                </div>
            </AdminPageWithTopBar>
        )
    }
}

const AdminCRUDPage = jss({
    body: {

    }
})(AdminCRUDPageUgly);

export default AdminCRUDPage;