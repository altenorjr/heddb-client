import React from 'react';
import jss from 'react-jss';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RichTextEditor from './@next/RichTextEditor';

import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

import { pageTypes as types } from '../data';

const validate = (props, { data }) => {
    const
        name = data.get('name', ''),
        link = data.get('link');

    let valid = true;

    if ([name, link].filter(t => t).length !== 2) {
        valid = false;
    }

    return valid;
}

const updateStateValue = (path, value) => ({ data }) => {
    let newData = data.setIn(path, value);

    if (path[0] === 'name') {
        const name = newData.get('name');

        newData = newData.set('link', name.toLowerCase().replace(/[.,/#!$%^&*;:{}=\\_`~()]/g,"").replace(/\s/g, '-'));
    }

    return { data: newData };
};

const renderContent = function ({ classes }, { data }) {
    if (!data) {
        return (<div />);
    }

    return (
        <div className={classes.form}>
            <SelectField
                floatingLabelText="Tipo"
                value={data.get('type') || 'article'}
                onChange={(e, i, type) => this.updateStateValue(['type'], type)}
                floatingLabelFixed
                fullWidth
            >
                {
                    types.map(type => (
                        <MenuItem
                            key={type.value}
                            value={type.value}
                            primaryText={type.text}
                        />
                    ))
                }
            </SelectField>
            <TextField
                floatingLabelText="Nome *"
                value={data.get('name', '')}
                onChange={(e) => this.updateStateValue(['name'], e.target.value)}
                floatingLabelFixed
                fullWidth
            />
            <TextField
                floatingLabelText="Link *"
                value={data.get('link', '')}
                onChange={(e) => this.updateStateValue(['link'], e.target.value)}
                floatingLabelFixed
                fullWidth
            />
            <RichTextEditor
                content={data.get('content', '')}
                editorClassName={classes.editor}
                onChange={(value) => this.updateStateValue(['content'], value)}
            />
        </div>
    );
}

const AdminArticleEditor = CRUDEditorPureComponent('Artigo', 'articles', AdminCrudEditor, {
    validate,
    updateStateValue,
    renderContent
});

export default jss({
    form: {
        padding: '20px'
    },
    editor: {
        // height: '25vw'
    }
})(AdminArticleEditor);