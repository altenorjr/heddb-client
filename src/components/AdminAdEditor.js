import React from 'react';
import jss from 'react-jss';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ImageEditor from './@next/ImageEditor';
import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

import { adLocations as locations } from '../data';

const validate = (props, state) => {
    const { data } = state

    const
        objectId = data.get('objectId', ''),
        name = data.get('name', ''),
        link = data.get('link', ''),
        newPic = data.get('newPic')

    let valid = true;

    if ([name, link].indexOf('') !== -1) {
        valid = false;
    }

    if (!newPic && !objectId) {
        valid = false;
    }

    return valid;
}

const renderContent = function ({ classes }, { data }) {
    if (!data) {
        return (<div />);
    }

    const { width, height } = locations.find(l => l.value === data.get('location', 'sidebar'));

    return (
        <div className={classes.form}>
            <SelectField
                floatingLabelText="Tipo"
                value={data.get('location', 'sidebar')}
                onChange={(e, i, location) => this.updateStateValue(['location'], location)}
                floatingLabelFixed
                fullWidth
            >
                {
                    locations.map((type, i) => (
                        <MenuItem
                            key={i}
                            value={type.value}
                            primaryText={type.text}
                        />
                    ))
                }
            </SelectField>
            <TextField
                floatingLabelText="Descrição *"
                value={data.get('name', '')}
                onChange={(e) => this.updateStateValue(['name'], e.target.value)}
                floatingLabelFixed
                fullWidth
            />
            <TextField
                floatingLabelText="Link *"
                value={data.get('link', '')}
                onChange={(e) => this.updateStateValue(['link'], e.target.value)}
                floatingLabelFixed
                fullWidth
            />
            <ImageEditor
                title={<span>Imagem * <br />L: {width}px; A: {height}px</span>}
                image={data.get('newPic') || data.getIn(['image', 'url']) || ''}
                onChange={(newPic) => this.updateStateValue(['newPic'], newPic)}
                shouldShowRemoveButton={() => false}
            />
        </div>
    );
}

let AdminAdEditor = CRUDEditorPureComponent('Anúncios', 'ads', AdminCrudEditor, {
    validate,
    renderContent
});

export default jss({
    form: {
        padding: '20px'
    },
    location: {
        display: 'flex'
    },
    state: {
        flex: 1,
        marginLeft: '10px'
    },
    city: {
        flex: 3
    }
})(AdminAdEditor);