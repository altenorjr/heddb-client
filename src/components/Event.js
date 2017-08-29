import React from 'react';
import jss from 'react-jss';
import { SocialIcon } from 'react-social-icons';
import moment from 'moment';
import { List } from 'immutable';

import padLeft from 'sugar/string/padLeft';

import EditControls from './EditControls';

const getName = (type) => ({
    calendar: 'Agenda',
    release: 'Lançamento',
    festival: 'Festival'
})[type];

const Event = ({
    data,
    classes, width = '100%',
    showMonth = false,
    fromNow = true,
    showEventType = false,
    showEditControls = false,
    requestEdition,
    requestDeletion
}) => {
    return (
        <div className={classes.eventHolder}>
            <div className={classes.left}>
                <div className={classes.date}>
                    {padLeft(moment(data.getIn(['date', 'iso'], '')).format('DD').toString(), 2, '0')}
                    {showMonth && ('/' + padLeft(moment(data.getIn(['date', 'iso'], '')).format('MMM').toLowerCase(), 2, '0'))}
                    {
                        fromNow && (
                            <small className={classes.fromNow}>{moment(data.getIn(['date', 'iso'], '')).fromNow()}</small>
                        )
                    }
                </div>
                {
                    !!((data.get('social') || new List()).size) && (
                        <div className={classes.social}>
                            {
                                data.get('social', new List()).map((link, i) => (
                                    <SocialIcon key={i} url={link} className={classes.socialIcon} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className={classes.pic} style={{ backgroundImage: `url(${data.getIn(['pic', 'url']) || data.getIn(['band', 'pic', 'url'])})` }} />
            <div className={classes.details}>
                <div className={classes.event}>
                    {
                        showEventType && (
                            <strong className={classes.type}>{getName(data.get('type'))}</strong>
                        )
                    }
                    <h1 className={classes.name}>{data.get('name') || data.getIn(['band', 'name'], '')}</h1>
                    <div className={classes.time}>{moment(data.getIn(['date', 'iso'], '')).format('HH[h]mm[min]')}</div>
                </div>
                <div className={classes.venue}>
                    <h2 className={classes.venueName}>{data.getIn(['venue', 'name'], '')}</h2>
                    <div className={classes.address}>{data.getIn(['venue', 'address'], '')}</div>
                    <div className={classes.city}>{data.getIn(['venue', 'city'], '')} - {data.getIn(['venue', 'state'], '').toUpperCase()}</div>
                    <div><a className={classes.phone} href={`tel:+55${data.getIn(['venue', 'phone'], '').replace(/[^0-9]/gi, '')}`}>{data.getIn(['venue', 'phone'], '')}</a></div>
                </div>
            </div>
            {
                showEditControls && (
                    <EditControls
                        requestEdition={() => requestEdition(data)}
                        requestDeletion={() => requestDeletion(data)}
                    />
                )
            }
        </div>
    );
}

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
    type: {
        textTransform: 'uppercase',
        color: '#7C1808',
        fontWeight: 900
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
        color: 'rgba(0, 0, 0, 0.6) !important',
        textDecoration: 'none',
        ':link': { color: 'rgba(0, 0, 0, 0.6) !important' },
        ':hover': { color: 'rgba(0, 0, 0, 0.6) !important' },
        ':active': { color: 'rgba(0, 0, 0, 0.6) !important' },
        ':visited': { color: 'rgba(0, 0, 0, 0.6) !important' }
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