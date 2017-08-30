import React from 'react';

const HtmlContent = ({ content, ...rest }) => <div {...rest} dangerouslySetInnerHTML={{__html: content}} />;

export default HtmlContent;