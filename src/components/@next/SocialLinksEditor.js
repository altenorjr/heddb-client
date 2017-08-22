import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { List } from 'immutable'

import TextField from 'material-ui/TextField';
import { SocialIcon } from 'react-social-icons';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';

class SocialLinksEditorUgly extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        links: PropTypes.instanceOf(List).isRequired,
        onChange: PropTypes.func.isRequired
    }

    addSocialIcon = () => {
        const newValue = this.props.links.push('https://');

        this.props.onChange(newValue);
    }

    updateSocialLink = (updatedIndex, value) => {
        const newValue = this.props.links.set(updatedIndex, value);

        this.props.onChange(newValue);
    }

    removeSocialLink = (deletedIndex) => {
        const newValue = this.props.links.delete(deletedIndex);

        this.props.onChange(newValue);
    }

    render = () => {
        const {
            title,
            classes,
            links = new List()
        } = this.props;

        return (
            <div className={classes.social}>
                <div className={classes.label}>
                    <div>{title}</div>
                    <IconButton onTouchTap={this.addSocialIcon}><AddIcon /></IconButton>
                </div>
                    {
                        links.map((link, i) => (
                            <div
                                key={i}
                                className={classes.socialLink}
                            >
                                <TextField
                                    name={`social-links-${i}`}
                                    value={link}
                                    onChange={(e) => this.updateSocialLink(i, e.target.value)}
                                    fullWidth
                                />
                                <SocialIcon className={classes.socialIcon} url={link}></SocialIcon>
                                <IconButton onTouchTap={() => this.removeSocialLink(i)}><RemoveIcon /></IconButton>
                            </div>
                        ))
                    }
            </div>
        )
    }
}

const SocialLinksEditor = jss({
    social: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-end',
        marginTop: '14px'
    },
    label: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        marginBottom: '5px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    socialLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    socialIcon: {
        width: '15px !important',
        height: '15px !important',
        padding: '11px',
        display: 'flex !important',
        margin: '10px',
        justifyContent: 'center'
    }
})(SocialLinksEditorUgly);

export default SocialLinksEditor;