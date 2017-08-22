import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { calculate } from '../../redux/dimensions';

const withDimensions = (WrappedComponent) => (
    class DimensionAware extends Component {
        state = calculate()

        update = () => this.setState(calculate);

        load = () => this.update();
        resize = () => this.update();

        componentWillMount = () => {
            let running = false;

            window.addEventListener("resize", () => {
                if (running) { return; }
                running = true;
                requestAnimationFrame(() => {
                    window.dispatchEvent(new CustomEvent("optimizedResize"));
                    running = false;
                });
            });

            window.addEventListener("optimizedResize", this.update);
        }

        componentDidMount = () => this.update()

        componentWillUnmount = () => window.removeEventListener("optimizedResize", this.update);

        render() {
            const forwardProps = Object.assign({}, this.props);

            return (
                <WrappedComponent dimensions={this.state} {...forwardProps} />
            );
        }
    }
);

export default withDimensions;

export const modes = {
    sm: 0,
    md: 1,
    lg: 2,
    xlg: 3
};

export const propTypes = PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    mode: PropTypes.oneOf([modes.sm, modes.md, modes.lg, modes.xlg]).isRequired,
    portrait: PropTypes.bool.isRequired
});

const getMode = ({ dimensions }) => Map.isMap(dimensions) ? dimensions.get('mode') : dimensions.mode;

export const is = (mode, props) => getMode(props) === modes[mode];

export const atLeast = (mode, props) => getMode(props) >= modes[mode];

export const atMost = (mode, props) => getMode(props) <= modes[mode];

export const width = (props) => props.dimensions.width;

export const height = (props) => props.dimensions.height;