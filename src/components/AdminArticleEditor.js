import React from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { Map } from 'immutable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RichTextEditor from './@next/RichTextEditor';

import CRUDEditorPureComponent from './@next/CRUDEditorPureComponent';

import AdminCrudEditor from './AdminCRUDEditor';

const types = [
    { value: 'article', text: 'Artigos', baseLink: 'artigos' },
    { value: 'about', text: 'Sobre', baseLink: 'paginas' },
    { value: 'donations', text: 'Doações', baseLink: 'paginas' },
    { value: 'contact', text: 'Contato', baseLink: 'paginas' }
];

class AdminArticleEditor extends CRUDEditorPureComponent('Artigo', AdminCrudEditor) {
    static propTypes = {
        data: PropTypes.instanceOf(Map),
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    state = {
        data: null
    }

    validate = () => {
        const { data } = this.state;

        const
            name = data.get('name', ''),
            link = data.get('link');

        let valid = true;

        if ([name, link].filter(t => t).length !== 2) {
            valid = false;
        }

        return valid;
    }

    updateStateValue = (path, value) => this.setState(({ data }) => {
        let newData = data.setIn(path, value);

        let nameChanged = false;

        let type;

        if (path[0] === 'type' && value !== 'article') {
            type = value;

            newData = newData.set('name', types.find(t => t.value === value).text);

            nameChanged = true;
        }

        if (path[0] === 'name' || nameChanged) {
            type = type || newData.get('type', 'article');
            const name = newData.get('name');
            const link = newData.get('link');

            if (name && (!link || type !== 'article')) {
                newData = newData.set('link', name.toLowerCase().replace(/\s/g, '-'));
            }
        }

        return { data: newData };
    });

    renderContent = () => {
        const { classes } = this.props;

        const { data } = this.state;

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
                    readOnly={data.get('type', 'article') !== 'article'}
                    value={data.get('name', '')}
                    onChange={(e) => this.updateStateValue(['name'], e.target.value)}
                    floatingLabelFixed
                    fullWidth
                />
                <TextField
                    floatingLabelText="Link *"
                    readOnly={data.get('type', 'article') !== 'article'}
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
}

export default jss({
    form: {
        padding: '20px'
    },
    editor: {
        height: '10vw'
    }
})(AdminArticleEditor);