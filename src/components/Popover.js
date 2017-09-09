import React, { Component } from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import cx from 'classnames';

import breakpoint from '../breakpoint';

class Popover extends Component {
    state = {
        open: false
    }

    close = () => this.setState(() => ({ open: false }));
    open = (how) => this.setState(() => ({ open: how }));

    render = () => {
        const {
            children,
            className,
            contentClassName,
            title,
            width,
            classes
        } = this.props;

        const { open } = this.state;

        let additionalProps;

        if (width > breakpoint) {
            additionalProps = {
                onMouseOver: () => this.open('hover'),
                onMouseOut: () => this.close()
            };
        }
        else {
            additionalProps = {
                onTouchTap: () => this.state.open ? this.close() : this.open('click'),
                onBlur: () => this.close(),
                tabIndex: 1
            }
        }

        return (
            <div
                className={
                    cx(
                        className,
                        classes.popover,
                        open && classes.open
                    )
                }
                {...additionalProps}
            >
                {/* onMouseOver={() => this.open('hover')} */}
                {/* onMouseOut={() => open === 'hover' && this.close()} */}
                {title(open)}
                <div
                    onTouchTap={() => this.close()}
                    className={
                        cx(
                            classes.popoverContent,
                            contentClassName,
                            'popover-content'
                        )
                    }
                >
                    {children}
                </div>
            </div>
        )
    }
}

Popover = jss({
    popover: {
        cursor: 'pointer',
        position: 'relative',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '&:focus': {
            outline: 0
        }
    },
    open: {
        '& .popover-content': {
            visibility: 'visible',
            opacity: 1,
            zIndex: 1,
            transform: 'translateY(0%)',
            transitionDelay: '0s, 0s, 0.3s'
        }
    },
    popoverContent: {
        visibility: 'hidden',
        opacity: 0,
        zIndex: 1,
        transform: 'translateY(-2em)',
        position: 'absolute',
        top: '100%',
        width: ({ popoverWidth = '100%' }) => popoverWidth,
        left: 0,
        transition: 'all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s'
    }
})(Popover);

export default connect(state => ({ width: state.getIn(['dimensions', 'width']) }))(Popover);