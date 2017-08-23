import Parse from 'parse';

import moment from 'moment';
import 'moment/locale/pt-br';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './static/styles/global.css';

moment.locale('pt-br');

injectTapEventPlugin();

Parse.initialize(process.env.REACT_APP_PARSE_SERVER_APPLICATION_ID);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL; 
console.log(Parse.serverURL);