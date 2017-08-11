import React, { PureComponent } from 'react';
import cx from 'classnames';
import jss from 'react-jss';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/'

import Holder from './Holder';

class UglyLogin extends PureComponent {
    render = () => {
        const { classes } = this.props;

        return (
            <Holder className={classes.holder}>
                <div className={classes.panel}>
                    <h1 className={classes.title}>Login</h1>
                    <div className={classes.box}>

                    </div>
                    <div className={classes.actions}>

                    </div>
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
    title: {
        margin: 0
    }
})(UglyLogin);

export default Login;