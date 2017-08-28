const React = require('react');
const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const { StateFilter } = require('./GenericFilter');
const Venue = require('./Venue');
const AdminVenueEditor = require('./AdminVenueEditor');
const redux = require('../redux/Venues');

const State = StateFilter('Venues');

module.exports = GenericCRUDModule(
    'Casas de Shows',
    'venues',
    redux,
    AdminCRUDPage,
    Venue,
    AdminVenueEditor,
    [<State />],
    {
        loadFunction: 'filterVenues'
    }
);