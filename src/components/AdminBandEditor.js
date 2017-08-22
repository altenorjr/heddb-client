import React from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { Map, List } from 'immutable';
import TextField from 'material-ui/TextField';

import SocialLinksEditor from './@next/SocialLinksEditor';
import ImageEditor from './@next/ImageEditor';
import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

class AdminBandEditorUgly extends CRUDEditorPureComponent('Banda', AdminCrudEditor) {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    state = {
        data: null
    }

    validate = () => {
        const {
            objectId = '',
            name = '',
            bio = '',
            state = '',
            city = '',
            newPic
        } = this.state.data.toJS();

        let valid = true;

        if ([name, bio, city, state].filter(t => t).length !== 4) {
            valid = false;
        }

        if (!newPic && !objectId) {
            valid = false;
        }

        return valid;
    }

    renderContent = () => {
        const { classes } = this.props;

        const { data } = this.state;

        if (!data) {
            return (<div />);
        }

        return (
            <div className={classes.form}>
                <TextField
                    floatingLabelText="Nome *"
                    value={data.get('name', '')}
                    onChange={(e) => this.updateStateValue(['name'], e.target.value)}
                    floatingLabelFixed
                    fullWidth
                />
                <TextField
                    floatingLabelText="Descrição *"
                    value={data.get('bio', '')}
                    onChange={(e) => this.updateStateValue(['bio'], e.target.value)}
                    rows={1}
                    rowsMax={10}
                    floatingLabelFixed
                    multiLine
                    fullWidth
                />
                <SocialLinksEditor
                    title="Redes Sociais *"
                    links={data.get('social', new List())}
                    onChange={(links) => this.updateStateValue(['social'], links)}
                />
                <ImageEditor
                    title="Foto *"
                    image={data.get('newPic', data.getIn(['pic', 'url'], ''))}
                    onChange={(newPic) => this.updateStateValue(['newPic'], newPic)}
                />
                <div className={classes.location}>
                    <TextField
                        floatingLabelText="Cidade *"
                        className={classes.city}
                        value={data.getIn(['city'], '')}
                        onChange={(e) => this.updateStateValue(['city'], e.target.value)}
                        floatingLabelFixed
                        fullWidth
                    />
                    <TextField
                        floatingLabelText="Estado *"
                        className={classes.state}
                        value={data.getIn(['state'], '')}
                        onChange={(e) => this.updateStateValue(['state'], e.target.value)}
                        floatingLabelFixed
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}

const AdminBandEditor = jss({
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
})(AdminBandEditorUgly);

export default AdminBandEditor;