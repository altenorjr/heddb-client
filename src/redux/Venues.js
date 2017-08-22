const GenericCrudReducer = require('./@next/GenericCrudReducer');
const { defaultTransformation, setFields } = require('../parse/util');

module.exports = GenericCrudReducer('Venues', {
    convert: (object, state) => defaultTransformation(object, state)
        .then(object => setFields(object, state.data.toJS(), ['phone', 'address']))
});