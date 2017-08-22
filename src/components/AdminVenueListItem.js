import React from 'react';
import jss from 'react-jss';
import { Map } from 'immutable';
import cx from 'classnames';

import LinesEllipsis from 'react-lines-ellipsis'
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

export default jss({
    item: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        background: '#EEEEEE',
        padding: '10px',
        width: '100%',
        margin: '10px 0'
    },
    info: {
        display: 'flex'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '0 30px 0 10px'
    },
    name: {

    },
    picHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    pic: {
        width: '100px',
        height: '100px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // borderRadius: '50px'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    description: {
        flexBasis: '50%',
        display: 'flex',
        alignItems: 'center'
    }
})(({
    classes,
    data = new Map(),
    requestEdition,
    requestDeletion
}) => {
    console.log(data.toJS());

    return (
        <div key={data.get('objectId')} className={classes.item}>
            <div className={classes.info}>
                <div className={classes.pic} style={{ backgroundImage: `url(${data.getIn(['pic', 'url'])})` }}></div>
                <div className={cx(classes.field, classes.name)}>
                    <h2>{data.get('name')}</h2>
                    <small>
                        {data.getIn(['location', 'address'])}<br />
                        {data.getIn(['location', 'phone'])}<br />
                        {data.getIn(['location', 'city'])} - {data.getIn(['location', 'state'])}
                    </small>
                </div>
            </div>
            <div className={classes.description}>
                <LinesEllipsis
                    text={data.get('bio')}
                    maxLine='4'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
            </div>
            <div className={classes.actions}>
                <IconButton onTouchTap={() => requestEdition(data)}><EditIcon /></IconButton>
                <IconButton onTouchTap={() => requestDeletion(data)} iconStyle={{ color: "#940C16" }}><DeleteIcon /></IconButton>
            </div>
        </div>
    )
});