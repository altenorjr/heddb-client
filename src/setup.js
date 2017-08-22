import 'dot-env';
import Parse from 'parse';

import moment from 'moment';
import 'moment/locale/pt-br';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './static/styles/global.css';

moment.locale('pt-br');

injectTapEventPlugin();

Parse.initialize("HojeEDiaDeBlues");
Parse.serverURL = 'http://localhost:1337/parse';