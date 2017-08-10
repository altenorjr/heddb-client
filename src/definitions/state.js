import PropTypes from 'prop-types';

export const state = PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
});

export const states = PropTypes.arrayOf(state);