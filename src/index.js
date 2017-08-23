import React from 'react';
import ReactDOM from 'react-dom';

// if (process.env.NODE_ENV === 'development') {
//     const result = require('dotenv-safe').load();
//     console.log(process.env);
// }

require('./setup');

const App = require('./components/App').default;

ReactDOM.render(<App />, document.getElementById('root'));