import React, { PureComponent } from 'react';
import jss from 'react-jss';
import PropTypes from 'prop-types';

import { Map, List } from 'immutable';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import FilterPanel from '../FilterPanel';
import Confirm from './Confirm';

export default (name, Container, ListItem, Editor, Filters, loadFunction) => {
    class CRUDPureComponent extends PureComponent {
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
            this.props[loadFunction]();
        }

        requestEdition = (item) => this.props.requestEdition(item);
        requestDeletion = (item) => this.props.requestDeletion(item);

        save = (objectId, data) => this.props.saveRecord(objectId, data)
            .then(() => this.props.requestEdition(null))
            .then(() => this.props[loadFunction]());

        delete = (id) => this.props.deleteRecord(id)
            .then(() => this.props.requestDeletion(null))
            .then(() => this.props[loadFunction]());

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
                classes,
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
                    <div>
                        <FilterPanel
                            top="64px"
                            filters={Filters}
                            adminMode
                        />
                        {
                            loading && (
                                <RefreshIndicator top={150} left={(window.innerWidth / 2) - 20} status="loading" />
                            )
                        }
                        {
                            !loading && (
                                <div className={classes.content}>
                                    {
                                        data.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                data={item}
                                                requestEdition={(d) => requestEdition(d)}
                                                requestDeletion={(d) => requestDeletion(d)}
                                                showEditControls
                                            />)
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
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

    return jss({
        content: {
            paddingTop: '51px'
        }
    })(CRUDPureComponent);
}