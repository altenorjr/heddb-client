import React from 'react';
import ReactDOM from 'react-dom';

require('./setup');

const App = require('./components/App').default;

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;

        ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
}