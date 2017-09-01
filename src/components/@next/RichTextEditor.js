import React, { PureComponent } from 'react';
import jss from 'react-jss';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const getCurrentState = (editorState) => {
    if (typeof editorState === 'string') {
        const { contentBlocks, entityMap } = htmlToDraft(editorState);
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const newEditorState = EditorState.createWithContent(contentState);

        return newEditorState;
    }

    return editorState;
}

class RichTextEditor extends PureComponent {
    static propTypes = {
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
    }


    state = {
        editorState: getCurrentState(this.props.content)
    }

    componentWillReceiveProps = ({ content }) => {
        this.setState({ editorState: getCurrentState(content) })
    }

    onChange = (editorState) => {
        this.setState({ editorState });

        this.props.onChange(editorState);
    }

    render = () => {
        const { classes, editorClassName } = this.props;
        const { editorState } = this.state;

        return (
            <Editor
                editorClassName={cx(classes.editor, editorClassName)}
                editorState={editorState}
                onEditorStateChange={this.onChange}
            />
        );
    }
}

export default jss({
    editor: {
        height: '25vw',
        border: '1px solid #DDD',
        padding: '5px'
    }
})(RichTextEditor);

export const getHtmlFromState = (state) => {
    const rawContentState = convertToRaw(state.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    return markup;
}