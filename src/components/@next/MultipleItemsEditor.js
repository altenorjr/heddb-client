import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';
import { List } from 'immutable'

import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';

class MultipleItemsEditor extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        items: PropTypes.instanceOf(List).isRequired,
        itemTemplate: PropTypes.func.isRequired,
        newItemTemplate: PropTypes.any,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        newItemTemplate: null
    }

    addItem = () => {
        const newValue = this.props.items.push(this.props.newItemTemplate || null);

        this.props.onChange(newValue);
    }

    updateItem = (updatedIndex, value) => {
        const newValue = this.props.items.set(updatedIndex, value);

        this.props.onChange(newValue);
    }

    removeItem = (deletedIndex) => {
        const newValue = this.props.items.delete(deletedIndex);

        this.props.onChange(newValue);
    }

    render = () => {
        const {
            title,
            classes,
            items = new List(),
            itemTemplate
        } = this.props;

        return (
            <div className={classes.items}>
                <div className={classes.label}>
                    <div>{title}</div>
                    <IconButton onTouchTap={this.addItem}><AddIcon /></IconButton>
                </div>
                <div>
                    {
                        items.map((item, i) => (
                            <div
                                key={i}
                                className={classes.item}
                            >
                                {itemTemplate(item, i)}
                                <IconButton onTouchTap={() => this.removeItem(i)}><RemoveIcon /></IconButton>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default jss({
    items: {
        display: 'flex',
        flexDirection: 'column',
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
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})(MultipleItemsEditor);