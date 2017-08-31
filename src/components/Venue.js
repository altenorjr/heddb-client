import React from 'react';
import injectSheet from 'react-jss';
import { SocialIcon } from 'react-social-icons';
import { Map, List } from 'immutable';

import EditControls from './EditControls';

const Venue = ({
    classes,
    width = '100%',
    data = new Map(),
    showEditControls = false,
    requestEdition,
    requestDeletion
}) => {
    return (
        <div className={classes.venue}>
            <div className={classes.left}>
                <h1 className={classes.name}>{data.get('name', '')}</h1>
                <p>
                    {data.getIn(['address'])} - {data.getIn(['city'])} - {data.getIn(['state'])}<br />
                    {
                        data.get('phone') && (
                            <small>{data.getIn(['phone'])}</small>
                        )
                    }
                </p>
                {
                    !!(data.get('social') || new List()).size && (
                        <div className={classes.links}>
                            {
                                (data.get('social') || new List()).map((link, i) => (
                                    <SocialIcon
                                        key={i}
                                        url={link}
                                        style={{
                                            marginRight: '10px',
                                            width: '30px',
                                            height: '30px'
                                        }}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                showEditControls && (
                    <EditControls
                        className={classes.controls}
                        requestEdition={() => requestEdition(data)}
                        requestDeletion={() => requestDeletion(data)}
                    />
                )
            }
            <div className={classes.picBox} />
        </div>
    );
};

const styles = {
    venue: {
        minHeight: '250px',
        width: ({ width = '100%' }) => width,
        margin: '0 0 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '650px',
        '@media (max-width: 1366px)': {
            minWidth: '100%'
        }
    },
    controls: {
        backgroundColor: '#E5E5E5'
    },
    left: {
        padding: '20px',
        backgroundColor: '#E5E5E5',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontWeight: 300,
        fontSize: '40px'
    },
    bio: {
        lineHeight: '1.5em',
        fontWeight: 200,
        fontSize: '18px'
    },
    links: {
    },
    picBox: {
        width: '30%',
        backgroundColor: '#000',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: ({ data }) => `url(${data.getIn(['pic', 'url'], '')})`
    }
};

export default injectSheet(styles)(Venue);