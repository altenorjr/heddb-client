const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const AdminBandListItem = require('./AdminBandListItem');
const AdminBandEditor = require('./AdminBandEditor');
const redux = require('../redux/Bands');

module.exports = GenericCRUDModule(
    'Banda', 
    'bands', 
    redux,
    AdminCRUDPage, 
    AdminBandListItem,
    AdminBandEditor,
    {
        loadFunction: 'filterRecords',
        loadParams: { state: 'all' }
    }
);