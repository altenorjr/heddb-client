import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Alert from './Alert';

const defaultUpdateStateValue = (path, value) => ({ data }) => ({ data: data.setIn(path, value) });

export const updateStateValue = defaultUpdateStateValue;

export default (name, reduxPath, Container, behaviour = {}) => {
    const {
        validate = () => false,
        renderContent = () => <div />,
        updateStateValue = defaultUpdateStateValue
    } = behaviour;

    class CRUDEditorPureComponent extends PureComponent {
        static propTypes = {
            data: PropTypes.instanceOf(Map),
            loading: PropTypes.bool.isRequired,
            onSave: PropTypes.func.isRequired,
            onClose: PropTypes.func.isRequired
        }

        state = {
            data: null,
            alert: null
        }

        updateStateValue = (path, value) => this.setState(updateStateValue(path, value, this.props));

        componentWillReceiveProps = (next) => this.setState({ data: next.data });

        save = () => {
            if (!validate(this.props, this.state)) {
                return this.alert('Existem campos não preenchidos corretamente.');
            }

            this.props.onSave(this.state.data.get('objectId'), this.state);
        }

        alert = (alert) => this.setState({ alert })

        render = () => {
            const { data } = this.state;

            const { loading } = this.props;

            if (!data) {
                return (<div />);
            }

            return (
                <Container
                    name={name}
                    loading={loading}
                    isInsert={!data.get('objectId')}
                    onSave={this.save}
                    onDismiss={() => this.props.onClose()}
                >
                    {renderContent.call(this, this.props, this.state)}
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

    const mapStateToProps = (state) => ({
        loading: state.getIn([reduxPath, 'loading'])
    })

    return connect(mapStateToProps, {})(CRUDEditorPureComponent);
}