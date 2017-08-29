import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { List } from 'immutable'

import TextField from 'material-ui/TextField';
import { SocialIcon } from 'react-social-icons';

import MultipleItemsEditor from './MultipleItemsEditor';

class SocialLinksEditor extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        links: PropTypes.instanceOf(List).isRequired,
        onChange: PropTypes.func.isRequired
    }

    updateSocialLink = (i, value) => {
        const newValue = this.props.links.set(i, value);

        this.props.onChange(newValue);
    }

    itemTemplate = (item, i) => (
        <div className={this.props.classes.socialLink}>
            <TextField
                name={`social-links-${i}`}
                value={item}
                onChange={(e) => this.updateSocialLink(i, e.target.value)}
                fullWidth
            />
            <SocialIcon className={this.props.classes.socialIcon} url={item}></SocialIcon>
        </div>
    );

    render = () => {
        const {
            title,
            links = new List()
        } = this.props;

        return (
            <MultipleItemsEditor
                title={title}
                items={links}
                itemTemplate={(item, i) => this.itemTemplate(item, i)}
                newItemTemplate="https://"
                onChange={(newValue) => this.props.onChange(newValue)}
            />
        )
    }
}

export default jss({
    socialLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    socialIcon: {
        width: '15px !important',
        height: '15px !important',
        padding: '11px',
        display: 'flex !important',
        margin: '10px',
        justifyContent: 'center'
    }
})(SocialLinksEditor);