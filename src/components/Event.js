import React from 'react';
import jss from 'react-jss';
import { SocialIcon } from 'react-social-icons';
import moment from 'moment';

import { String as SugarString } from 'sugar/string';

const Event = ({ event, classes, width = '100%', showMonth = false, fromNow = true }) => (
    <div className={classes.eventHolder}>
        <div className={classes.left}>
            <div className={classes.date}>
                {SugarString.padLeft(moment(event.date).format('DD').toString(), 2, '0')}
                {showMonth && ('/' + SugarString.padLeft(moment(event.date).format('MMM').toLowerCase(), 2, '0'))}
                {
                    fromNow && (
                        <small className={classes.fromNow}>{moment(event.date).fromNow()}</small>
                    )
                }
            </div>
            {
                Array.isArray(event.links) && event.links.length && (
                    <div className={classes.social}>
                        {
                            event.links.map((link, i) => (
                                <SocialIcon key={i} url={link} className={classes.socialIcon} />
                            ))
                        }
                    </div>
                )
            }
        </div>
        <div className={classes.pic} style={{ backgroundImage: `url(${event.band.pic})` }} />
        <div className={classes.details}>
            <div className={classes.event}>
                <h1 className={classes.name}>{event.name || event.band.name}</h1>
                <div className={classes.time}>{moment(event.date).format('hh[h]mm[min]')}</div>
            </div>
            <div className={classes.venue}>
                <div className={classes.city}>{event.venue.location.city} - {event.venue.location.state.toUpperCase()}</div>
                <h2 className={classes.venueName}>{event.venue.name}</h2>
                <div className={classes.address}>{event.venue.address}</div>
                <div><a className={classes.phone} href={`tel:+55${event.venue.phone.replace(/[^0-9]/gi, '')}`}>{event.venue.phone}</a></div>
            </div>
        </div>
    </div>
);

const styles = {
    eventHolder: {
        width: ({ width }) => width,
        margin: '0 0 20px 0',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        alignItems: 'flex-start',
        backgroundColor: '#E5E5E5',
        fontWeight: 200,
        height: '275px',
        // boxShadow: '0px 0px 20px rgba(127, 127, 127, 0.5)',
        minWidth: '650px',
        '@media (max-width: 1366px)': {
            minWidth: '100%'
        }
    },
    left: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    fromNow: {
        display: 'block',
        fontSize: '12px',
        textAlign: 'center',
        marginTop: '5px',
        fontWeight: 200,
        color: 'rgba(255, 255, 255, 0.6)'
    },
    date: {
        padding: '45px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        color: '#FFF',
        fontSize: '30px',
        fontWeight: 200,
        textAlign: 'center'
    },
    pic: {
        width: '230px',
        height: '230px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: '0 10px 0 10px'
    },
    details: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    event: {
        flex: 1
    },
    name: {
        margin: '0',
        textTransform: 'uppercase',
        fontWeight: '300',
        fontSize: '50px'
    },
    time: {
        fontWeight: 200
    },
    city: {
        fontWeight: 200
    },
    venue: {
    },
    venueName: {
        margin: '0 0 10px 0',
        fontWeight: 200
    },
    phone: {
        fontSize: '18px',
        color: 'rgba(0, 0, 0, 0.8)',
        textDecoration: 'none',
        ':link': { color: 'rgba(0, 0, 0, 0.8)' },
        ':hover': { color: 'rgba(0, 0, 0, 0.8)' },
        ':active': { color: 'rgba(0, 0, 0, 0.8)' },
        ':visited': { color: 'rgba(0, 0, 0, 0.8)' }
    },
    social: {
        margin: '10px 0 5px 0'
    },
    socialIcon: {
        width: '30px !important',
        height: '30px !important',
        marginRight: '10px'
    }
};

export default jss(styles)(Event);