import React from 'react';
import ReactDOM from 'react-dom';

require('./setup');

const App = require('./components/App').default;

ReactDOM.render(<App />, document.getElementById('root'));