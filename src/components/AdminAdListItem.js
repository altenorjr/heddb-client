import React, { PureComponent } from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';

import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import EditControls from './EditControls';

class AdminArticleListItem extends PureComponent {
    state = {
        open: false
    }

    toggleOpen = () => this.setState(({ open }) => ({ open: !open }));

    locations = [
        { value: 'banner', text: 'Banner' },
        { value: 'sidebar', text: 'Barra Lateral' },
        { value: 'highlights', text: 'Destaques da Página Inicial' }
    ]    

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
                        <h4>{this.locations.filter(l => l.value === data.get('location', 'sidebar')).text}</h4>
                        <small>{data.get('link')}</small>
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
                        <div>
                            <img src={data.getIn(['image', 'url'])} alt={data.get('name')} />
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
    content: {
        padding: '15px',
        backgroundColor: '#FFF',
        border: '1px solid rgba(200, 200, 200, 1)'
    }
})(AdminArticleListItem);