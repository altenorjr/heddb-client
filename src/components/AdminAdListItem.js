import React, { PureComponent } from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';

import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import { adLocations as locations } from '../data';

import EditControls from './EditControls';

class AdminArticleListItem extends PureComponent {
    state = {
        open: false
    }

    toggleOpen = () => this.setState(({ open }) => ({ open: !open }));

    render = () => {
        const {
            classes,
            data = new Map(),
            requestEdition,
            requestDeletion
        } = this.props;

        const {
            open
        } = this.state;

        const { width, height } = locations.find(l => l.value === data.get('location', 'sidebar'));

        return (
            <div className={classes.holder}>
                <div className={classes.header}>
                    <div>
                        <h1 className={classes.title}>
                            {data.get('name')}
                        </h1>
                        <strong>{locations.find(l => l.value === data.get('location', 'sidebar')).text}</strong><br />
                        <small><a target="_blank" href={data.get('link')}>{data.get('link')}</a></small>
                    </div>
                    <div className={classes.actions}>
                        <IconButton onTouchTap={this.toggleOpen}>
                            {open ? <ArrowUp /> : <ArrowDown />}
                        </IconButton>
                        <EditControls
                            className={classes.controls}
                            requestEdition={() => requestEdition(data)}
                            requestDeletion={() => requestDeletion(data)}
                        />
                    </div>
                </div>
                {
                    open && (
                        <div
                            className={classes.bannerHolder}
                            style={{
                                height: `${height * 1.1}px`
                            }}
                        >
                            <div
                                className={classes.bannerSample}
                                style={{
                                    width,
                                    height,
                                    backgroundImage: `url(${data.getIn(['image', 'url'])})`
                                }}
                            >
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default jss({
    holder: {
        backgroundColor: 'rgba(200, 200, 200, .3)',
        marginBottom: '15px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        position: 'sticky',
        top: '64px',
        backgroundColor: 'rgba(200, 200, 200, 1)'
    },
    actions: {
        display: 'flex',
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    bannerHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerSample: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: '#000'
    }
})(AdminArticleListItem);