import moment from 'moment';
import 'moment/locale/pt-br';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './static/styles/global.css';

moment.locale('pt-br');

injectTapEventPlugin();