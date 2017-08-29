const React = require('react');
const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const { StateFilter } = require('./GenericFilter');
const AdminBandListItem = require('./AdminBandListItem');
const AdminBandEditor = require('./AdminBandEditor');
const redux = require('../redux/Bands');

const State = StateFilter('Bands');

module.exports = GenericCRUDModule(
    'Blueseiros', 
    'bands', 
    redux,
    AdminCRUDPage, 
    AdminBandListItem,
    AdminBandEditor,
    [<State />],
    {
        loadFunction: 'filterBands',
        loadParams: { shouldLoadMetadata: true }
    }
);