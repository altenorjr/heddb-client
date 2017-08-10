import React from 'react';
import jss from 'react-jss';

import Event from './Event';
import Emoji from './Emoji';

const Events = ({
    events,
    classes,
    padding = '30px',
    width = '100%',
    showMonth = false,
    fromNow = true
}) => {
    if (events.length) {
        return (
            <div className={classes.events}>
                {
                    events.map((event, i) => (
                        <Event {...{ width, showMonth, fromNow, event, key: i }} />
                    ))
                }
            </div>
        );
    }
    else {
        return (
            <div className={classes.empty}>
                <p className={classes.message}>Nenhum evento encontrado</p>
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
    }
};

export default jss(styles)(Events);