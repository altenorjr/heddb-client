import React from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { Map, List, fromJS } from 'immutable';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import SocialLinksEditor from './@next/SocialLinksEditor';
import ImageEditor from './@next/ImageEditor';
import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

import { filterRecords as loadBands } from '../redux/Bands';
import { loadRecords as loadVenues } from '../redux/Venues';

class AdminEventEditorUgly extends CRUDEditorPureComponent('Evento', AdminCrudEditor) {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        loadVenues: PropTypes.func.isRequired,
        loadBands: PropTypes.func.isRequired,
        bands: PropTypes.array,
        venues: PropTypes.array
    }

    state = {
        data: null,
        alert: null,
        loaded: false
    }

    types = [
        { value: 'calendar', text: 'Evento' },
        { value: 'release', text: 'Lançamento' },
        { value: 'festival', text: 'Festival' }
    ]

    loadState = (props) => {
        if (props.bands.length && props.venues.length) {
            return this.setState({ loaded: true });
        }
    }

    componentDidMount = () => {
        this.loadState(this.props);

        if (!this.props.bands.length) {
            this.props.loadBands({}).then(() => this.loadState());
        }

        if (!this.props.venues.length) {
            this.props.loadVenues().then(() => this.loadState());
        }
    }

    updateStateValue = (path, value) => {
        this.setState(({ data }) => {
            const oldBandName = data.getIn(['band', 'name']);

            let newData = data.setIn(path, value);

            const band = newData.get('band');
            const name = newData.get('name');

            if (band && (!name || name === oldBandName)) {
                newData = newData.set('name', band.get('name'));
            }

            return { data: newData };
        });
    }

    validate = () => {
        const { data } = this.state;

        const date = data.getIn(['date', 'iso'], null);
        const band = data.get('band', null);
        const venue = data.get('venue', null);

        let valid = true;

        if (isNaN(Date.parse(date))) {
            valid = false;
        }

        if (band === null || venue === null) {
            valid = false;
        }

        return valid;
    }

    pictureUpdated = (newPic) => {
        if (!newPic && this.state.data.getIn(['pic', 'url'])) {
            return this.updateStateValue(['pic', 'url'], newPic);
        }

        this.updateStateValue(['newPic'], newPic)
    }

    renderContent = () => {
        const {
            classes,
            bands,
            venues
        } = this.props;

        const { data } = this.state;

        if (!data) {
            return (<div />);
        }

        return (
            <div className={classes.form}>
                <SelectField
                    floatingLabelText="Tipo"
                    value={data.get('type', 'calendar')}
                    onChange={(e, i, type) => console.log({ e, i, type }) || this.updateStateValue(['type'], this.types[i].value)}
                    floatingLabelFixed
                    fullWidth
                >
                    {
                        this.types.map((type, i) => (
                            <MenuItem key={i} value={type.value} primaryText={type.text} />
                        ))
                    }
                </SelectField>
                <div className={classes.section}>
                    <div className={classes.sectionItem}>
                        <SelectField
                            floatingLabelText="Banda"
                            value={data.getIn(['band', 'objectId'], '')}
                            onChange={(e, i, id) => this.updateStateValue(['band'], fromJS(bands[i]))}
                            floatingLabelFixed
                            fullWidth
                        >
                            {
                                bands.map(band => (
                                    <MenuItem key={band.objectId} value={band.objectId} primaryText={band.name} />
                                ))
                            }
                        </SelectField>
                    </div>
                    <div className={classes.sectionItem}>
                        <SelectField
                            floatingLabelText="Local"
                            value={data.getIn(['venue', 'objectId'], '')}
                            onChange={(e, i, id) => this.updateStateValue(['venue'], fromJS(venues[i]))}
                            floatingLabelFixed
                            fullWidth
                        >
                            {
                                venues.map(venue => (
                                    <MenuItem key={venue.objectId} value={venue.objectId} primaryText={venue.name} />
                                ))
                            }
                        </SelectField>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.sectionItem}>
                        <DatePicker
                            floatingLabelText="Data *"
                            value={data.getIn(['date', 'iso']) ? new Date(data.getIn(['date', 'iso'])) : null}
                            onChange={(e, value) => this.updateStateValue(['date', 'iso'], value.toISOString())}
                            floatingLabelFixed={true}
                            locale="pt-BR"
                            cancelLabel="Cancelar"
                            DateTimeFormat={global.Intl.DateTimeFormat}
                            style={{ width: '100%' }}
                            textFieldStyle={{ width: '100%' }}
                        />
                    </div>
                    <div className={classes.sectionItem}>
                        <TimePicker
                            floatingLabelText="Hora *"
                            format="24hr"
                            cancelLabel="Cancelar"
                            value={data.getIn(['date', 'iso']) ? new Date(data.getIn(['date', 'iso'])) : null}
                            onChange={(e, value) => this.updateStateValue(['date', 'iso'], value.toISOString())}
                            floatingLabelFixed={true}
                            style={{ width: '100%' }}
                            textFieldStyle={{ width: '100%' }}
                        />
                    </div>
                </div>
                <TextField
                    floatingLabelText="Nome *"
                    value={data.get('name', '')}
                    onChange={(e) => this.updateStateValue(['name'], e.target.value)}
                    floatingLabelFixed
                    fullWidth
                />
                <SocialLinksEditor
                    title="Redes Sociais *"
                    links={data.get('social') || new List()}
                    onChange={(links) => this.updateStateValue(['social'], links)}
                />
                <ImageEditor
                    title="Foto *"
                    image={data.get('newPic') || data.getIn(['pic', 'url']) || data.getIn(['band', 'pic', 'url']) || ''}
                    onChange={(newPic) => this.pictureUpdated(newPic)}
                    shouldShowRemoveButton={(newImage) => !!newImage || !!data.getIn(['pic', 'url'])}
                />
            </div>
        );
    }
}

const AdminEventEditor = jss({
    form: {
        padding: '20px'
    },
    section: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    sectionItem: {
        flex: 1,
        display: 'flex',
        marginLeft: '10px',
        '&:first-child': {
            marginLeft: 0
        }
    },
    add: {
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
})(AdminEventEditorUgly);

const mapStateToProps = (props) => ({
    bands: props.getIn(['bands', 'data']).toJS(),
    venues: props.getIn(['venues', 'data']).toJS()
});

const mapDispatchToProps = {
    loadBands,
    loadVenues
}

const mergeProps = (s, d, o) => Object.assign({}, o, s, d);

const AdminEventEditorConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminEventEditor);

export default AdminEventEditorConnected;