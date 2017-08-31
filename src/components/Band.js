import React from 'react';
import jss from 'react-jss';
import { SocialIcon } from 'react-social-icons';
import { Map, List } from 'immutable';

import EditControls from './EditControls';

const Band = ({
    classes,
    width = '100%',
    data = new Map(),
    showState = false,
    showEditControls = false,
    showStateInformation = false,
    requestEdition,
    requestDeletion
}) => {
    return (
        <div className={classes.band}>
            <div className={classes.left}>
                <h1 className={classes.name}>{data.get('name', '')}</h1>
                {
                    showStateInformation && (
                        <h3 className={classes.state}>{data.get('city', '')} - {data.get('state', '')}</h3>
                    )
                }
                <p className={classes.bio}>{data.get('bio', '')}</p>
                <div className={classes.links}>
                    {
                        data.get('social', new List()).map((link, i) => (
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

export default jss({
    band: {
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
        justifyContent: 'space-around',
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
})(Band);