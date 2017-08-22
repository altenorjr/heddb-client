const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const Venue = require('./Venue');
const AdminVenueEditor = require('./AdminVenueEditor');
const redux = require('../redux/Venues');

module.exports = GenericCRUDModule(
    'Casas de Shows', 
    'venues', 
    redux,
    AdminCRUDPage, 
    Venue, 
    AdminVenueEditor
);