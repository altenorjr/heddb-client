import React from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import cx from 'classnames';
import Slider from 'react-slick';
import { List } from 'immutable';

import { desktop } from 'breakpoints-json';
import breakpoint from '../breakpoint';

export default (type) => {
    let PublicityZone = (props) => {
        const {
            className,
            classes,
            itemClassName,
            dots = true,
            speed = 5000,
            items = new List()
        } = props;

        let { min, max } = desktop;

        min = parseInt(min, 10);
        max = parseInt(max, 10);

        const sidebarBreakpoint = min + ((max - min) / 2);

        if (!items.size || (type === 'sidebar' && props.width < sidebarBreakpoint)) {
            return (<div />);
        }

        return (
            <Slider
                className={cx(className, classes.panel, classes[type])}
                arrows={false}
                dots={dots}
                autoplay
                slidesToShow={1} 
                slidesToScroll={1}
                autoplaySpeed={speed}
            >
                {
                    items.map(item => (
                        <a
                            key={item.get('objectId')}
                            href={item.get('link')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx(classes.sliderItem, itemClassName)}
                            style={{
                                backgroundImage: `url(${item.getIn(['image', 'url'])})`
                            }}
                        >&nbsp;</a>
                    ))
                }
            </Slider>
        );
    };

    PublicityZone = jss({
        panel: {
            backgroundColor: '#000'
        },
        sliderItem: {
            display: 'block !important',
            overflow: 'hidden',
            backgroundColor: '#000',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: '100%',
            height: '100%'
        },
        banner: {
            width: '500px',
            height: '124px',
            '& .slick-track': {
                height: '124px',
                [`@media (max-width: ${breakpoint}px)`]: {
                    height: '100px'
                }
            },
            '& .slick-list': {
                height: '124px',
                [`@media (max-width: ${breakpoint}px)`]: {
                    height: '100px',
                }
            },
            [`@media (max-width: ${breakpoint}px)`]: {
                width: '100%',
                height: '100px'
            }
        },
        sidebar: {
            width: '300px',
            height: '595px',
            '& .slick-list': {
                height: '595px'
            },
            '& .slick-track': {
                height: '595px'
            }
        },
        highlights: {
            width: '900px',
            height: '400px',
            [`@media (max-width: ${breakpoint}px)`]: {
                width: '100vw',
                height: '44vw'
            },
            '& .slick-list': {
                height: '400px',
                [`@media (max-width: ${breakpoint}px)`]: {
                    width: '100vw',
                    height: '44vw'
                }
            },
            '& .slick-track': {
                height: '400px',
                [`@media (max-width: ${breakpoint}px)`]: {
                    width: '100vw',
                    height: '44vw'
                }
            }
        }
    })(PublicityZone);

    const mapStateToProps = (state) => ({
        items: state.getIn(['ads', type], new List()),
        width: state.getIn(['dimensions', 'width'])
    });

    return connect(mapStateToProps)(PublicityZone);
}