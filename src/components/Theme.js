import React from 'react';
import jss from 'react-jss';

const Theme = ({ render }) => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                {render()}
            </div>
        </div>
    );
};

const styles = {
    outerContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        backgroundColor: '#FFF',
        boxSizing: 'border-box'
    }
};

export default jss(styles)(Theme);