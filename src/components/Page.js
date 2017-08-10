import React from 'react';
import jss from 'react-jss';

import Holder from './Holder';
import Panel from './Panel';
import MarkdownContent from './MarkdownContent';

const UglyPage = ({ classes, content }) => (
    <Holder>
        <Panel>
            <MarkdownContent text={content} />
        </Panel>
    </Holder>
);

const Page = jss({

})(UglyPage);

export default Page;