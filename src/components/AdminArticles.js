const React = require('react');
const GenericCRUDModule = require('./@next/GenericCRUDModule');

const AdminCRUDPage = require('./AdminCRUDPage');
const AdminArticleListItem = require('./AdminArticleListItem');
const AdminArticleEditor = require('./AdminArticleEditor');
const redux = require('../redux/Articles');
const { TypeFilter } = require('./GenericFilter');

const Type = TypeFilter('Articles');

module.exports = GenericCRUDModule(
    'Artigos e Páginas', 
    'articles', 
    redux,
    AdminCRUDPage, 
    AdminArticleListItem,
    AdminArticleEditor,
    [<Type />],
    {
        loadFunction: 'filterArticles',
        loadParams: { shouldLoadMetadata: true }
    }
);