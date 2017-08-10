import React from 'react';
import jss from 'react-jss';
import remark from 'remark';
import reactRenderer from 'remark-react';

const UglyMarkdownContent = ({ text, classes, ...props }) => (
    <div className={classes.markdown}>
        {remark().use(reactRenderer).processSync(text).contents}
    </div>
);

const MarkdownContent = jss({
    markdown: {
        '& h1': {
            position: 'sticky',
            top: '224px',
            margin: 0,
            padding: '16px 0',
            background: 'rgba(255, 255, 255, .9)'
        }
    }
})(UglyMarkdownContent);

export default MarkdownContent;