import React from 'react';

const Emoji = ({ value, description }) => (
    <span role="img" aria-label={description}>{value}</span>
);

export default Emoji;