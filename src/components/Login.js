import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import jss from 'react-jss';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Redirect } from 'react-router-dom';

import { adminPaths } from '../paths';
import { login } from '../redux/authentication'

import Holder from './Holder';

class UglyLogin extends PureComponent {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        authenticated: PropTypes.bool,
        authenticating: PropTypes.bool,
        error: PropTypes.any
    }

    static defaultProps = {
        authenticated: false,
        authenticating: true
    }

    state = {
        username: '',
        password: ''
    }

    fieldChanged = (name) => (e) => this.setState({ [name]: e.target.value });

    validate = () => this.state.username && this.state.password

    onSubmit = (e) => {
        e.preventDefault();

        if (this.validate()) {
            this.props.onLogin(this.state);
        }
    }

    render = () => {
        const { classes, authenticating, authenticated } = this.props;

        if (authenticated) {
            return (<Redirect to={adminPaths[0].path} />);
        }

        return (
            <Holder className={classes.holder}>
                <div className={classes.panel}>
                    <form onSubmit={this.onSubmit} className={classes.form}>
                        <h1>Hoje é dia de Blues</h1>
                        <div className={classes.formFields}>
                            <TextField
                                floatingLabelText="Usuário"
                                className={cx(classes.field, classes.username)}
                                type="text"
                                value={this.state.username}
                                onChange={this.fieldChanged('username')}
                                fullWidth />
                            <TextField
                                floatingLabelText="Senha"
                                className={cx(classes.field, classes.password)}
                                type="password"
                                value={this.state.password}
                                onChange={this.fieldChanged('password')}
                                fullWidth />
                        </div>
                        {
                            this.state.errorMessage && (
                                <div className={classes.errorMessage}>
                                    {this.state.errorMessage}
                                </div>
                            )
                        }
                        <div className={classes.actions}>
                            {
                                authenticating ?
                                    (<CircularProgress />) :
                                    (<FlatButton type="submit" primary>Login</FlatButton>)
                            }
                        </div>
                    </form>
                </div>
            </Holder>
        );
    }
}

const Login = jss({
    holder: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#E5E5E5'
    },
    panel: {
        backgroundColor: '#FFF',
        width: '400px',
        padding: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& > h1': {
            marginBottom: '30px'
        }
    },
    formFields: {
        display: 'flex',
        flexDirection: 'column'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '30px'
    }
})(UglyLogin);

export { Login };

const mapStateToProps = (state) => ({
    authenticated: state.getIn(['authentication', 'authenticated']),
    authenticating: state.getIn(['authentication', 'authenticating']),
    error: state.getIn(['authentication', 'error'])
});

const matchDispatchToProps = ({
    onLogin: login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login)