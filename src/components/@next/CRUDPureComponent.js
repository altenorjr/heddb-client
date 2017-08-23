import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Map, List } from 'immutable';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Confirm from './Confirm';

export default (name, Container, ListItem, Editor, loadFunction, loadParams) => class CRUDPureComponent extends PureComponent {
    static propTypes = {
        data: PropTypes.instanceOf(List),
        [loadFunction]: PropTypes.func.isRequired,
        saveRecord: PropTypes.func.isRequired,
        deleteRecord: PropTypes.func.isRequired,
        editingItem: PropTypes.instanceOf(Map),
        deletingItem: PropTypes.instanceOf(Map),
        requestEdition: PropTypes.func.isRequired,
        requestDeletion: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        this.props[loadFunction](loadParams);
    }

    requestEdition = (item) => this.props.requestEdition(item);
    requestDeletion = (item) => this.props.requestDeletion(item);

    save = (objectId, data) => this.props.saveRecord(objectId, data)
        .then(() => this.props.requestEdition(null))
        .then(() => this.props[loadFunction](loadParams));

    delete = (id) => this.props.deleteRecord(id)
        .then(() => this.props.requestDeletion(null))
        .then(() => this.props[loadFunction](loadParams));

    renderEditor = () => {
        return (
            <Editor
                data={this.props.editingItem}
                onSave={this.save}
                onClose={() => this.props.requestEdition(null)}
            />
        );
    }

    render = () => {
        const {
            data,
            loading,
            editingItem,
            deletingItem,
            requestEdition,
            requestDeletion
        } = this.props;

        return (
            <Container
                title={name}
                editor={this.renderEditor()}
                editorOpen={!!editingItem}
                onCloseEditor={() => requestEdition(null)}
                onRequestAdd={() => requestEdition(new Map())}
            >
                {
                    loading && (
                        <RefreshIndicator top={100} left={(window.innerWidth / 2) - 20} status="loading" />
                    )
                }
                {
                    !loading && (
                        data.map((item, i) => (
                            <ListItem
                                key={i}
                                data={item}
                                requestEdition={(d) => requestEdition(d)}
                                requestDeletion={(d) => requestDeletion(d)}
                                showEditControls
                            />)
                        )
                    )
                }
                {
                    deletingItem && (
                        <Confirm
                            onConfirm={() => this.delete(deletingItem.get('objectId'))}
                            onDismiss={() => requestDeletion(null)}
                        >
                            Deseja realmente excluir <strong>"{deletingItem.get('name')}"</strong>?
                        </Confirm>
                    )
                }
            </Container>
        )
    }
}