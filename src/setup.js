import moment from 'moment';
import 'moment/locale/pt-br';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './static/styles/global.css';

moment.locale('pt-br');

injectTapEventPlugin();

export const ghPages = (l) => {
    if (l.search) {
        var q = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (q.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + (q.p || '') +
                (q.q ? ('?' + q.q) : '') +
                l.hash
            );
        }
    }
};