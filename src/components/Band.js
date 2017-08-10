import React from 'react';
import injectSheet from 'react-jss';
import { SocialIcon } from 'react-social-icons';

const Band = ({ classes, sheet, width = '100%', band }) => (
    <div className={classes.band}>
        <div className={classes.left}>
            <h1 className={classes.name}>{band.name}</h1>
            <p className={classes.bio}>{band.bio}</p>
            <div className={classes.links}>
                {
                    band.social.map((link, i) => (
                        <SocialIcon key={i} url={link} style={{ marginRight: '10px' }} />
                    ))
                }
            </div>
        </div>
        <div className={classes.picBox} />
    </div>
);

const styles = {
    band: {
        minHeight: '400px',
        width: ({ width = '100%' }) => width,
        margin: '0 0 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '650px',
        '@media (max-width: 1366px)': {
            minWidth: '100%'
        }
    },
    left: {
        padding: '20px',
        backgroundColor: '#E5E5E5',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    name: {
        fontWeight: 300,
        fontSize: '40px',
        margin: '0 0 30px 0'
    },
    bio: {
        lineHeight: '1.5em',
        fontWeight: 200
    },
    links: {
        margin: '30px 0 0 0',
    },
    picBox: {
        width: '50%',
        backgroundColor: '#FFF',
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: ({ band: { pic } }) => `url(${pic})`
    }
};

export default injectSheet(styles)(Band);