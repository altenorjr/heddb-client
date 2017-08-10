import PropTypes from 'prop-types';

export const month = PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
});

export const months = PropTypes.arrayOf(month);