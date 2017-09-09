import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateLocation } from '../redux/location';

class LocationSpy extends PureComponent {
    componentDidMount = () => this.props.updateLocation(this.props.location);

    componentWillReceiveProps = (next) => this.props.updateLocation(next.location);

    render = () => React.Children.only(this.props.children);
}

export default withRouter(connect(null, { updateLocation })(LocationSpy))