import React from 'react';
import jss from 'react-jss';
import { SocialIcon } from 'react-social-icons';
import moment from 'moment';
import { List } from 'immutable';

import padLeft from 'sugar/string/padLeft';

import breakpoint from '../breakpoint';

import { phonePortrait } from 'breakpoints-json';

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
    showHour = false,
    mini = false,
    fromNow = true,
    showEventType = false,
    showEditControls = false,
    requestEdition,
    requestDeletion
}) => {
    return (
        <div className={classes.eventHolder}>
            <div className={classes.boxes}>
                <div className={classes.left}>
                    <div className={classes.date}>
                        {padLeft(moment(data.getIn(['date', 'iso'], '')).format('DD').toString(), 2, '0')}
                        {showMonth && ('/' + moment(data.getIn(['date', 'iso'], '')).format('MM'))}
                        {
                            showHour && (
                                <span className={classes.hour}>{moment(data.getIn(['date', 'iso'], '')).format('HH[h]mm[min]')}</span>
                            )
                        }
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
                <div className={classes.pic} style={{ backgroundImage: `url(${data.getIn(['pic', 'url']) || data.getIn(['bands', 0, 'pic', 'url'])})` }} />
            </div>
            <div className={classes.details}>
                <div className={classes.event}>
                    {
                        showEventType && (
                            <strong className={classes.type}>{getName(data.get('type'))}</strong>
                        )
                    }
                    <h1 className={classes.name}>{data.get('name') || data.getIn(['band', 'name'], '')}</h1>
                    {
                        !showHour && (
                            <div className={classes.time}>{moment(data.getIn(['date', 'iso'], '')).format('HH[h]mm[min]')}</div>
                        )
                    }
                </div>
                <div className={classes.venue}>
                    <h2 className={classes.venueName}>{data.getIn(['venue', 'name'], '')}</h2>
                    <div className={classes.address}>{data.getIn(['venue', 'address'], '')}</div>
                    <div className={classes.city}>{data.getIn(['venue', 'city'], '')} - {data.getIn(['venue', 'state'], '').toUpperCase()}</div>
                    {
                        data.getIn(['venue', 'phone'], false) && (
                            <div>
                                <a
                                    className={classes.phone}
                                    href={`tel:+55${data.getIn(['venue', 'phone'], '').replace(/[^0-9]/gi, '')}`}
                                >
                                    {data.getIn(['venue', 'phone'], '')}
                                </a>
                            </div>
                        )
                    }
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
        height: ({ mini }) => mini ? '185px' : '275px',
        // boxShadow: '0px 0px 20px rgba(127, 127, 127, 0.5)',
        minWidth: '650px',
        // flexWrap: 'wrap',
        [`@media (max-width: ${breakpoint}px)`]: {
            minWidth: '100vw',
            width: '100vw',
            height: 'auto !important',
        },
        [`@media (max-width: ${phonePortrait.max}px)`]: {
            flexDirection: 'column'
        }
    },
    type: {
        textTransform: 'uppercase',
        color: '#7C1808',
        fontWeight: 900
    },
    boxes: {
        order: 0,
        display: 'flex',
        justifyContent: 'space-between',
        [`@media (max-width: ${breakpoint}px)`]: {
            order: 1,
        },
        [`@media (max-width: ${phonePortrait.max}px)`]: {
            width: '100%',
            order: 0
        }
    },
    details: {
        order: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexBasis: '450px',
        height: 'auto',
        [`@media (max-width: ${breakpoint}px)`]: {
            marginTop: '15px',
            order: 0,
            flexBasis: 'unset'
        },
        [`@media (max-width: ${phonePortrait.max}px)`]: {
            width: '100%',
            order: 1
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
    hour: {
        display: 'block',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '5px',
        fontWeight: '200',
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
        width: ({ mini }) => mini ? '145px' : '230px',
        height: ({ mini }) => mini ? '145px' : '230px',
        backgroundSize: 'cover',
        borderRadius: ({ mini }) => mini ? '10px' : '0',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: '0 10px 0 10px',
        backgroundColor: '#000',
        [`@media (max-width: ${phonePortrait.max}px)`]: {
            margin: 0
        }
    },
    event: {
        flex: 1
    },
    name: {
        margin: '0',
        textTransform: 'uppercase',
        fontWeight: '300',
        fontSize: ({ mini }) => mini ? '35px' : '50px'
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