import React from 'react';
import jss from 'react-jss';
import { List, fromJS } from 'immutable';
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

import { eventTypes as types } from '../data';


const getSingleBandId = (data) => data.getIn(['bands', 0, 'objectId'], null);

const getSingleBand = (data, bands) => fromJS(bands.find(b => b.objectId === getSingleBandId(data)) || {});

const getSingleBandInfo = (path, defaultValue, data, bands) => getSingleBand(data, bands).getIn(path, defaultValue);

const getBandById = (id, bands) => bands.find(b => b.objectId === id);

const validate = (props, { data }) => {
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
};

const renderContent = function ({ classes, bands, venues }, { data }) {
    if (!data) {
        return (<div />);
    }

    return (
        <div className={classes.form}>
            <SelectField
                floatingLabelText="Tipo"
                value={data.get('type', 'calendar')}
                onChange={(e, i, type) => this.updateStateValue(['type'], type)}
                floatingLabelFixed
                fullWidth
            >
                {
                    types.map((type, i) => (
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
                        value={getSingleBandId(data)}
                        onChange={(e, i, id) => this.updateStateValue(['bands'], fromJS([getBandById(id, bands)]))}
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
                image={data.get('newPic', false) || data.getIn(['pic', 'url'], false) || (data.get('type') !== 'festival' ? getSingleBandInfo(['pic', 'url'], '', data, bands) : '')}
                onChange={(newPic) => this.updateStateValue(['newPic'], newPic)}
                shouldShowRemoveButton={(newImage) => !!newImage || (!!data.getIn(['pic', 'url']) && data.get('type') !== 'festival')}
            />
        </div>
    );
}

const updateStateValue = function (path, value, { bands }) {
    return ({ data }) => {
        const oldBandName = getSingleBandInfo(['name'], '', data, bands);

        let newData;

        if (path[0] !== 'newPic') {
            newData = data.setIn(path, value);
        }
        else {
            if (!value && data.getIn(['pic', 'url'])) {
                newData = data.setIn(['pic', 'url'], null);
            }
            else {
                newData = data.set('newPic', value);
            }
        }

        const type = newData.get('type');
        const band = getSingleBand(newData, bands);
        const name = newData.get('name');

        if (band && (!name || name === oldBandName) && type !== 'festival') {
            newData = newData.set('name', band.get('name'));
        }

        return { data: newData };
    };
}

const loadState = function () {
    if (this.props.bands.length && this.props.venues.length) {
        return this.setState({ loaded: true });
    }
}

const componentDidMount = function () {
    loadState.call(this);

    if (!this.props.bands.length) {
        this.props.filterBands({}).then(() => loadState.call(this));
    }

    if (!this.props.venues.length) {
        this.props.filterVenues().then(() => loadState.call(this));
    }
};

let AdminEventEditor = CRUDEditorPureComponent('Evento', 'events', AdminCrudEditor, {
    validate,
    renderContent,
    updateStateValue,
    componentDidMount
});

AdminEventEditor = jss({
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
})(AdminEventEditor);

const mapStateToProps = (props) => ({
    bands: props.getIn(['bands', 'data']).toJS(),
    venues: props.getIn(['venues', 'data']).toJS()
});

const mapDispatchToProps = {
    filterBands,
    filterVenues
}

const mergeProps = (s, d, o) => ({ ...o, ...s, ...d });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AdminEventEditor);