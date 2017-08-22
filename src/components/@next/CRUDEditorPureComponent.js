import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Alert from './Alert';

export default (name, Container) => class CRUDEditorPureComponent extends PureComponent {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    state = {
        data: null,
        alert: null
    }

    componentWillReceiveProps = (next) => this.setState({ data: next.data });

    updateStateValue = (path, value) => this.setState(({ data }) => ({ data: data.setIn(path, value) }));

    validate = (props, state) => { throw new Error("You must override the method 'validate'") }
    renderContent = (props, state) => { throw new Error("You must override the method 'renderContent'") }

    save = () => {
        if (!this.validate()) {
            return this.alert('Existem campos não preenchidos corretamente.');
        }

        this.props.onSave(this.state.data.get('objectId'), this.state);
    }

    alert = (alert) => this.setState({ alert })

    render = () => {
        const { data } = this.state;

        if (!data) {
            return (<div />);
        }

        return (
            <Container
                name={name}
                isInsert={!data.get('objectId')}
                onSave={this.save}
                onDismiss={() => this.props.onClose()}
            >
                {this.renderContent()}
                {
                    this.state.alert && (
                        <Alert
                            onDismiss={() => this.alert()}
                        >
                            {this.state.alert}
                        </Alert>
                    )
                }
            </Container>
        );
    }
}