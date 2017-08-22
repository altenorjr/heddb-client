const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const AdminEventListItem = require('./AdminEventListItem');
const AdminEventEditor = require('./AdminEventEditor');
const redux = require('../redux/Events');

module.exports = GenericCRUDModule(
    'Eventos',
    'events',
    redux,
    AdminCRUDPage,
    AdminEventListItem,
    AdminEventEditor,
    {
        loadFunction: 'filterRecords',
        loadParams: { city: 'all', month: 'all' }
    }
);