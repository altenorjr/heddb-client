const React = require('react');
const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const { CityFilter, MonthFilter, TypeFilter } = require('./GenericFilter');
const AdminEventListItem = require('./AdminEventListItem');
const AdminEventEditor = require('./AdminEventEditor');
const redux = require('../redux/Events');

const City = CityFilter('Events');
const Month = MonthFilter('Events');
const Type = TypeFilter('Events');

module.exports = GenericCRUDModule(
    'Eventos',
    'events',
    redux,
    AdminCRUDPage,
    AdminEventListItem,
    AdminEventEditor,
    [
        <Type />,
        <City />,
        <Month />
    ],
    {
        loadFunction: 'filterEvents'
    }
);