import React from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { Map } from 'immutable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ImageEditor from './@next/ImageEditor';
import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

class AdminVenueEditorUgly extends CRUDEditorPureComponent('Anúncios', AdminCrudEditor) {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    locations = [
        { value: 'banner', text: 'Banner' },
        { value: 'sidebar', text: 'Barra Lateral' },
        { value: 'highlights', text: 'Destaques da Página Inicial' }
    ]

    state = {
        data: null,
        newPic: null,
        alert: null
    }

    validate = () => {
        const { data } = this.state

        const
            objectId = data.get('objectId', ''),
            name = data.get('name', ''),
            link = data.get('link', ''),
            image = data.get('image', ''),
            location = data.get('location', ''),
            newPic = data.get('newPic')

        let valid = true;

        if ([name, link, location].indexOf('') !== -1) {
            valid = false;
        }

        if (!newPic && !objectId) {
            valid = false;
        }

        return valid;
    }

    imageDimensions = () => {
        const location = this.state.data.get('location', 'sidebar');

        switch (location) {
            case 'banner':
                return 'L: 500px; A: 124px';
            case 'sidebar':
                return 'L: 300px; A: 595px';
            case 'highlights':
                return 'L: 900px; A: 400px';
            default:
                return '';
        }
    }

    renderContent = () => {
        const { classes } = this.props;

        const { data } = this.state;

        if (!data) {
            return (<div />);
        }

        return (
            <div className={classes.form}>
                <SelectField
                    floatingLabelText="Tipo"
                    value={data.get('location', 'sidebar')}
                    onChange={(e, i, location) => this.updateStateValue(['location'], this.locations[i].value)}
                    floatingLabelFixed
                    fullWidth
                >
                    {
                        this.locations.map((type, i) => (
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
                    title={<span>Imagem * <br /><small>{this.imageDimensions()}</small></span>}
                    image={data.get('newPic') || data.getIn(['pic', 'url']) || ''}
                    onChange={(newPic) => this.updateStateValue(['newPic'], newPic)}
                />
            </div>
        );
    }
}

const AdminVenueEditor = jss({
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
})(AdminVenueEditorUgly);

export default AdminVenueEditor;