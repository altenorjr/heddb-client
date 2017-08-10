import PropTypes from 'prop-types';

export const city = PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
});

export const cities = PropTypes.arrayOf(city);