import React from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import cx from 'classnames';
import Slider from 'react-slick';
import { List } from 'immutable';

import { adLocations } from '../data';

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

        if (!items.size) {
            return <div />
        }

        const { width, height } = adLocations.find(l => l.value === type);

        return (
            <Slider
                className={cx(className, classes[type])}
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
                                backgroundImage: `url(${item.getIn(['image', 'url'])})`,
                                width: `${width}px`,
                                height: `${height}px`
                            }}
                        >&nbsp;</a>
                    ))
                }
            </Slider>
        );
    };

    PublicityZone = jss({
        sliderItem: {
            display: 'block !important',
            overflow: 'hidden',
            backgroundColor: '#000',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        },
        banner: {
            width: '500px',
            height: '124px',
            '& .slick-list': { height: '124px' }
        },
        sidebar: {
            width: '300px',
            height: '595px',
            '& .slick-list': { height: '595px' }
        },
        highlights: {
            width: '900px',
            height: '400px',
            '& .slick-list': { height: '400px' }
        }
    })(PublicityZone);

    const mapStateToProps = (state) => ({
        items: state.getIn(['ads', type], new List())
    });

    return connect(mapStateToProps)(PublicityZone);
}