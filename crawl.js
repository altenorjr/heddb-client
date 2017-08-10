const nightmare = require('nightmare');

const instance = new Nightmare({
    useContentSize: true,
    show: true,
    waitTimeout: 3000,
    gotoTimeout: 3000,
    loadTimeout: 3000,
    executionTimeout: 3000,
    alwaysOnTop: false //,
    // webPreferences: { nativeWindowOpen: true }
});

const schedules = [
    'estado-de-minas-gerais-ago-2017',
    'estado-de-sao-paulo-agosto-2017',
    'campo-grande-ago-2017',
    'florianopolis-agosto-2017',
    'rio-de-janeiro-agosto-2017',
    'sao-paulo-agosto-2017'
].map(path => `https://www.hojeediadeblues.com.br/${path}`);