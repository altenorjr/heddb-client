import React from 'react';
import cx from 'classnames';
import jss from 'react-jss';

import Event from './Event';
import Emoji from './Emoji';

const Events = ({
    events,
    loading,
    classes,
    className,
    padding = '30px',
    width = '100%',
    showMonth = false,
    showHour = false,
    mini = false,
    fromNow = true
}) => {
    if (loading) {
        return (
            <div className={classes.holder}>&nbsp;</div>
        );
    }

    if (events.size) {
        return (
            <div className={cx(classes.events, className)}>
                {
                    events.map((data, i) => (
                        <Event {...{ width, showMonth, showHour, mini, fromNow, data, key: i }} />
                    ))
                }
            </div>
        );
    }
    else {
        return (
            <div className={classes.empty}>
                <p className={classes.message}>Blues não encontrado</p>
                <div className={classes.emoji}><Emoji description="Que triste..." value="😨" /></div>
            </div>
        );
    }
};

const styles = {
    events: {
        display: 'flex',
        padding: 0,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    empty: {
        display: 'flex',
        width: '100%',
        flex: 1,
        minHeight: '300px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        textTransform: 'lowercase',
        fontSize: '22px'
    },
    emoji: {
        fontSize: '70px'
    },
    loadingHolder: {
        minHeight: '300px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default jss(styles)(Events);