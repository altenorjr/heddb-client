const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const AdminAdListItem = require('./AdminAdListItem');
const AdminAdEditor = require('./AdminAdEditor');
const redux = require('../redux/Ads');

module.exports = GenericCRUDModule(
    'Anúncios',
    'ads',
    redux,
    AdminCRUDPage,
    AdminAdListItem,
    AdminAdEditor,
    [],
    {
        loadFunction: 'getAds',
        loadParams: { shouldLoadMetadata: true }
    }
);