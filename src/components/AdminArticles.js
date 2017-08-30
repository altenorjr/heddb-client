const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const AdminArticleListItem = require('./AdminArticleListItem');
const AdminArticleEditor = require('./AdminArticleEditor');
const redux = require('../redux/Articles');

module.exports = GenericCRUDModule(
    'Artigos', 
    'articles', 
    redux,
    AdminCRUDPage, 
    AdminArticleListItem,
    AdminArticleEditor,
    [],
    {
        loadFunction: 'filterArticles',
        loadParams: { shouldLoadMetadata: true }
    }
);