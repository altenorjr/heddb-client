import remark from 'remark';
import reactRenderer from 'remark-react';

const MarkdownContent = (text) => remark().use(reactRenderer).processSync(text).contents;

export default MarkdownContent;