import React, { PureComponent } from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';

import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import HtmlContent from './HtmlContent';
import EditControls from './EditControls';
import { pageTypes as types } from '../data';

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

        return (
            <div className={classes.holder}>
                <div className={classes.header}>
                    <div>
                        <h1 className={classes.title}>
                            {data.get('name')}
                        </h1>
                        <small>/{types.find(t => t.value === data.get('type', 'article')).baseLink}/{data.get('link')}</small>
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
                        <HtmlContent
                            className={classes.content}
                            content={data.get('content', '')}
                        />
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
    content: {
        padding: '15px',
        backgroundColor: '#FFF',
        border: '1px solid rgba(200, 200, 200, 1)'
    }
})(AdminArticleListItem);