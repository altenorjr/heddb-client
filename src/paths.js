import React from 'react';
import Home from './components/Home';
import Page from './components/Page';
import BrazilianBlues from './components/BrazilianBlues';
import Calendar from './components/Calendar';

import AdminVenues from './components/AdminVenues'; 
import AdminBands from './components/AdminBands'; 
import AdminEvents from './components/AdminEvents'; 

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
        path: '/artigos',
        name: 'Artigos',
        render: () => <Page content={generateContent("Artigos")} />
    }, {
        path: '/sobre',
        name: 'Sobre',
        render: () => <Page content={generateContent("Sobre")} />
    }, {
        path: '/doações',
        name: 'Doações',
        render: () => <Page content={generateContent("Doações")} />
    }, {
        path: '/contato',
        name: 'Contato',
        render: () => <Page content={generateContent("Contato")} />
    }
];


const generateContent = (title) => (`
# ${title}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit erat et tortor elementum euismod. Curabitur vel odio blandit, euismod dui nec, suscipit nisi. Maecenas porta sagittis posuere. Nulla ut risus et massa laoreet porta. Phasellus efficitur finibus est id tincidunt. Suspendisse vel nibh et nisl interdum condimentum sed euismod ipsum. Donec varius, sem ut finibus suscipit, lectus mi dapibus dolor, sit amet vestibulum neque turpis id neque. Nunc faucibus et metus at viverra.

Curabitur ac hendrerit mauris, eget ullamcorper erat. Quisque pulvinar, mi eu suscipit tempus, velit ex sollicitudin dolor, sit amet placerat lorem libero eu metus. Suspendisse nisl quam, posuere nec elementum eget, iaculis quis eros. Integer sed metus tristique, dapibus enim eget, finibus dolor. Etiam non sagittis libero. Proin at justo et nibh tincidunt ultrices vehicula in massa. Mauris aliquam leo vitae fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean sed neque mattis, fermentum enim ac, pulvinar mauris. Maecenas sed odio sit amet mauris imperdiet imperdiet. Proin vel arcu massa. Donec in felis arcu. Duis tempus cursus tellus, id efficitur erat condimentum sed. Quisque quis aliquam tellus, nec convallis dui. Nulla ut enim eget turpis ultrices gravida sed at elit.

Integer quam lectus, varius vel nibh quis, auctor ultrices magna. Maecenas a eros quis odio hendrerit auctor a sit amet tellus. Integer viverra nisl a accumsan vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean gravida sapien et congue dapibus. Vivamus vestibulum bibendum ipsum at tincidunt. Integer a aliquet sapien, eget facilisis neque. Nam ullamcorper nulla et sodales viverra. Etiam porttitor ante sed ipsum porttitor, eu scelerisque sem cursus. Pellentesque euismod eleifend risus quis sollicitudin. Nam dolor neque, aliquet eu porta nec, porttitor congue erat. Morbi vestibulum, augue quis lacinia placerat, diam ligula condimentum sem, ac bibendum nisi ante ac enim. Duis orci enim, lobortis consequat eros non, dignissim iaculis lorem. Sed mauris felis, sagittis eget porta quis, volutpat quis eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Donec rhoncus felis quis est ultrices, non egestas urna imperdiet. Sed convallis est nisi, non venenatis libero scelerisque hendrerit. Nulla commodo metus sit amet ante tincidunt, quis posuere enim efficitur. Cras imperdiet diam condimentum interdum euismod. Sed viverra eros pharetra, scelerisque diam vitae, viverra turpis. Mauris at ipsum pulvinar, viverra purus et, suscipit est. Etiam porta nibh velit, vel ornare velit suscipit vel. Curabitur libero tellus, auctor sit amet vehicula a, tincidunt vel purus. Mauris laoreet dictum urna. Praesent finibus mi non auctor bibendum. In commodo, metus eu hendrerit auctor, odio diam dapibus ipsum, a luctus neque erat non sapien. Donec lobortis congue mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc est ipsum, eleifend sit amet gravida eu, hendrerit eu nisi. Ut sagittis quam ut erat pharetra egestas.

Vestibulum accumsan vitae odio sit amet suscipit. Proin id lorem vulputate, faucibus odio auctor, vehicula nisi. Etiam vehicula sagittis convallis. Sed malesuada sapien eget ultricies condimentum. Nunc in odio non justo ultricies lacinia id non urna. Aenean id erat eros. Pellentesque aliquet dictum convallis. Donec egestas rutrum tellus, et tempus ex commodo eget. Phasellus tempor, ex at consequat hendrerit, felis eros pellentesque erat, eget commodo libero ante vitae neque. Pellentesque sit amet tincidunt eros, ut luctus sapien. Maecenas dictum ut orci eu scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi varius sapien eget purus rhoncus, eu malesuada erat suscipit.
`)