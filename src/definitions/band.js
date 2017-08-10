import PropTypes from 'prop-types';

export const band = PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
    social: PropTypes.arrayOf(PropTypes.string)
});

export const bands = PropTypes.arrayOf(band);