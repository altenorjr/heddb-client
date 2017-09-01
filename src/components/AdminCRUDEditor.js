import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import jss from 'react-jss';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';

import DoneIcon from 'material-ui/svg-icons/action/done';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

class AdminCRUDEditor extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        isInsert: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired,
        onDismiss: PropTypes.func.isRequired
    }

    render = () => {
        const {
            classes,
            className,
            name,
            loading,
            isInsert,
            children
        } = this.props;

        return (
            <form
                onSubmit={(e) => e.preventDefault() || this.props.onSave()}
                className={cx(classes.editor, className)}
            >
                <h1 className={classes.title}>
                    {isInsert ? 'Inserir' : 'Editar'} {name}
                </h1>
                <div>{children}</div>
                {
                    !loading && (
                        <div>
                            <FloatingActionButton
                                type="submit"
                                className={cx(classes.actions, classes.save)}
                            >
                                <DoneIcon />
                            </FloatingActionButton>
                            <FloatingActionButton
                                className={cx(classes.actions, classes.close)}
                                onTouchTap={() => this.props.onDismiss()}
                                secondary
                            >
                                <CloseIcon />
                            </FloatingActionButton>
                        </div>
                    )
                }
                {
                    loading && (
                        <div className={cx(classes.actions, classes.save)}>
                            <CircularProgress />
                        </div>
                    )
                }
            </form>
        );
    }
}

export default jss({
    editor: {
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100vh',
        position: 'relative',
        paddingBottom: '80px'
    },
    title: {
        background: '#FFF',
        padding: '10px',
        position: 'sticky',
        boxShadow: '0 0 20px #000',
        top: 0,
        zIndex: 10
    },
    actions: {
        position: 'fixed',
        bottom: '30px',
        zIndex: 10
    },
    save: {
        right: '30px'
    },
    close: {
        left: '30px'
    }
})(AdminCRUDEditor);