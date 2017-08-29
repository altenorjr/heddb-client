import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { Map, List, fromJS } from 'immutable'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import MultipleItemsEditor from './@next/MultipleItemsEditor';

class MultipleBandsEditor extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        bands: PropTypes.instanceOf(List).isRequired,
        availableBands: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    selectableBands = (item) => {
        return this.props.availableBands.filter(b => this.props.bands.indexOf(b.objectId) === -1 || (item && b.objectId === item));
    }

    getBand = (bandId) => fromJS(this.props.availableBands.find(b => b.objectId === bandId) || {});

    updateSelectedBand = (i, bandId) => {
        const newValue = this.props.bands.set(i, this.getBand(bandId));

        this.props.onChange(newValue);
    }

    itemTemplate = (item, i) => {
        return (
            <div className={this.props.classes.band}>
                <div className={this.props.classes.badge}>{i + 1}</div>
                <SelectField
                    floatingLabelText="Banda"
                    value={item.get('objectId')}
                    onChange={(e, j, value) => this.updateSelectedBand(i, value)}
                    floatingLabelFixed
                    fullWidth
                >
                    {
                        this.selectableBands(item).map((band) => (
                            <MenuItem
                                key={band.objectId}
                                value={band.objectId}
                                primaryText={band.name}
                                secondaryText={<small>{band.city} - {band.state}</small>}
                            />
                        ))
                    }
                </SelectField>
            </div>
        );
    };

    render = () => {
        const {
            title,
            bands = new List()
        } = this.props;

        return (
            <MultipleItemsEditor
                title={title}
                items={bands}
                itemTemplate={(item, i) => this.itemTemplate(item, i)}
                newItemTemplate={new Map()}
                onChange={(newValue) => this.props.onChange(newValue)}
            />
        )
    }
}

export default jss({
    band: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    badge: {
        color: '#FFF',
        backgroundColor: '#000',
        fontSize: '12px',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        margin: '0 15px 0 0'
    },
    socialIcon: {
        width: '15px !important',
        height: '15px !important',
        padding: '11px',
        display: 'flex !important',
        margin: '10px',
        justifyContent: 'center'
    }
})(MultipleBandsEditor);