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
import MultipleBandsEditor from './MultipleBandsEditor';

import ImageEditor from './@next/ImageEditor';
import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

import { filterBands } from '../redux/Bands';
import { filterVenues } from '../redux/Venues';

class AdminEventEditorUgly extends CRUDEditorPureComponent('Evento', AdminCrudEditor) {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        filterVenues: PropTypes.func.isRequired,
        filterBands: PropTypes.func.isRequired,
        bands: PropTypes.array,
        venues: PropTypes.array
    }

    state = {
        data: null,
        alert: null,
        loaded: false
    }

    types = [
        { value: 'calendar', text: 'Agenda' },
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
            this.props.filterBands({}).then(() => this.loadState());
        }

        if (!this.props.venues.length) {
            this.props.filterVenues().then(() => this.loadState());
        }
    }

    updateStateValue = (path, value) => {
        this.setState(({ data }) => {
            const oldBandName = this.getSingleBandInfo(['name'], '', data);

            let newData = data.setIn(path, value);

            const type = newData.get('type');
            const band = this.getSingleBand(newData);
            const name = newData.get('name');

            if (band && (!name || name === oldBandName) && type !== 'festival') {
                newData = newData.set('name', band.get('name'));
            }

            return { data: newData };
        });
    }


    validate = () => {
        const { data } = this.state;

        const objectId = data.get('objectId', null);
        const type = data.get('type', 'calendar');
        const newPic = data.get('newPic', null);
        const pic = data.getIn(['pic', 'url'], null);
        const date = data.getIn(['date', 'iso'], null);
        const bands = data.get('bands', new List());
        const venue = data.get('venue', null);

        let valid = true;

        if (isNaN(Date.parse(date))) {
            valid = false;
        }

        if (venue === null) {
            valid = false;
        }

        if (['calendar', 'festival', 'event'].indexOf(type) === -1) {
            valid = false;
        }

        if (type !== 'festival' && bands.size !== 1) {
            valid = false;
        }

        if (type === 'festival' && bands.size < 2) {
            valid = false;
        }

        if (!objectId && type === 'festival' && !newPic) {
            valid = false;
        }

        if (objectId && !newPic && !pic && type === 'festival') {
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

    getSingleBandId = (data = this.state.data) => data.getIn(['bands', 0, 'objectId'], null);

    getSingleBand = (data = this.state.data) => fromJS(this.props.bands.find(b => b.objectId === this.getSingleBandId(data)) || {});

    getSingleBandInfo = (path, defaultValue, data = this.state.data) => this.getSingleBand(data).getIn(path, defaultValue);

    getBandById = (id) => this.props.bands.find(b => b.objectId === id);

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
                    onChange={(e, i, type) => this.updateStateValue(['type'], this.types[i].value)}
                    floatingLabelFixed
                    fullWidth
                >
                    {
                        this.types.map((type, i) => (
                            <MenuItem
                                key={i}
                                value={type.value}
                                primaryText={type.text}
                            />
                        ))
                    }
                </SelectField>
                {
                    data.get('type') !== 'festival' && (
                        <SelectField
                            floatingLabelText="Banda"
                            value={this.getSingleBandId()}
                            onChange={(e, i, id) => this.updateStateValue(['bands'], fromJS([this.getBandById(id)]))}
                            floatingLabelFixed
                            fullWidth
                        >
                            {
                                bands.map(band => (
                                    <MenuItem
                                        key={band.objectId}
                                        value={band.objectId}
                                        primaryText={band.name}
                                        secondaryText={<small>{band.city} - {band.state}</small>}
                                    />
                                ))
                            }
                        </SelectField>
                    )
                }
                {
                    data.get('type') === 'festival' && (
                        <MultipleBandsEditor
                            title="Bandas *"
                            bands={data.get('bands') || new List()}
                            availableBands={bands}
                            onChange={(selectedBands) => this.updateStateValue(['bands'], selectedBands)}
                        />
                    )
                }
                <SelectField
                    floatingLabelText="Local"
                    value={data.getIn(['venue', 'objectId'], '')}
                    onChange={(e, i, id) => this.updateStateValue(['venue'], fromJS(venues[i]))}
                    floatingLabelFixed
                    fullWidth
                >
                    {
                        venues.map(venue => (
                            <MenuItem
                                key={venue.objectId}
                                value={venue.objectId}
                                primaryText={venue.name}
                                secondaryText={<small>{venue.city} - {venue.state}</small>}
                            />
                        ))
                    }
                </SelectField>
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
                    title="Redes Sociais"
                    links={data.get('social') || new List()}
                    onChange={(links) => this.updateStateValue(['social'], links)}
                />
                <ImageEditor
                    title={`Foto ${data.get('type') === 'festival' ? '*' : ''}`}
                    image={data.get('newPic', false) || data.getIn(['pic', 'url'], false) || (data.get('type') !== 'festival' ? this.getSingleBandInfo(['pic', 'url'], '') : '')}
                    onChange={(newPic) => this.pictureUpdated(newPic)}
                    shouldShowRemoveButton={(newImage) => !!newImage || (!!data.getIn(['pic', 'url']) && data.get('type') !== 'festival')}
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
    filterBands,
    filterVenues
}

const mergeProps = (s, d, o) => ({ ...o, ...s, ...d });

const AdminEventEditorConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminEventEditor);

export default AdminEventEditorConnected;