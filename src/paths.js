import React from 'react';
import Home from './components/Home';
import Page from './components/Page';
import BrazilianBlues from './components/BrazilianBlues';
import Calendar from './components/Calendar';

import AdminVenues from './components/AdminVenues'; 
import AdminBands from './components/AdminBands'; 
import AdminEvents from './components/AdminEvents'; 
import AdminArticles from './components/AdminArticles';

export const adminPaths = [
    {
        path: '/admin/blueseiros',
        name: 'Blueseiros',
        component: AdminBands
    }, {
        path: '/admin/casas-de-shows',
        name: 'Casas de Shows',
        component: AdminVenues
    }, {
        path: '/admin/eventos',
        name: 'Eventos',
        component: AdminEvents
    }, {
        path: '/admin/artigos',
        name: 'Artigos',
        component: AdminArticles
    }
];

export const websitePaths = [
    {
        path: '/',
        name: 'Início',
        component: Home
    }, {
        path: '/agenda',
        name: 'Agenda',
        render: () => (<Calendar type="calendar" />)
    }, {
        path: '/festivais',
        name: 'Festivais',
        render: () => (<Calendar type="festival" />)
    }, {
        path: '/lançamentos',
        name: 'Lançamentos',
        render: () => (<Calendar type="release" />)
    }, {
        path: '/blueseiros-brasileiros',
        name: 'Blueseiros Brasileiros',
        component: BrazilianBlues
    }, {
        path: '/artigos/:link',
        name: 'Artigos',
        component: Page,
        virtual: true
    }, {
        path: '/paginas/:link',
        name: 'Paginas',
        component: Page,
        virtual: true
    }
];