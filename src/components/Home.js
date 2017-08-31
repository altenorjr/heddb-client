import React, { PureComponent } from 'react';
import jss from 'react-jss';
import Slider from 'react-slick';
import { List } from 'immutable';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import Holder from './Holder';
import Panel from './Panel';
import Events from './Events';

import { getUpcomingEvents } from '../redux/Events';

class Home extends PureComponent {
    componentDidMount = () => this.props.getUpcomingEvents();

    render = () => {
        const {
            className,
            classes,
            loading = false,
            events = new List(),
            sheet,
            children
        } = this.props;

        return (
            <Holder>
                <Panel>
                    <h1 className={classes.title}>Próximos Eventos</h1>
                    <div className={classes.bodyHolder}>
                        <div className={classes.upcomingEvents}>
                            {
                                loading && (
                                    <CircularProgress />
                                )
                            }
                            {
                                !loading && (
                                    <Events
                                        events={events}
                                        padding={0}
                                        fromNow={false}
                                        showMonth
                                        showHour
                                        mini
                                    />
                                )
                            }
                        </div>
                        <Slider
                            className={classes.publicitySpot1}
                            arrows={false}
                            dots={true}
                            autoplay
                            slidesToShow={1}
                            slidesToScroll={1}
                            autoplaySpeed={5000}
                        >
                            <a
                                href="https://google.com.br"
                                target="_blank"
                                className={classes.sliderItem_PS1}
                                style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_13a7b6eba67645948a07bdd6987e715b~mv2.png/v1/fill/w_454,h_254,al_c,lg_1/de661d_13a7b6eba67645948a07bdd6987e715b~mv2.png)' }}
                            />
                            <a
                                href="https://google.com.br"
                                target="_blank"
                                className={classes.sliderItem_PS1}
                                style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_2cca8274c6ad4eb38bd6e9828a809907~mv2.jpg/v1/fill/w_576,h_322,al_c,lg_1,q_80/de661d_2cca8274c6ad4eb38bd6e9828a809907~mv2.webp)' }}
                            />
                            <a
                                href="https://google.com.br"
                                target="_blank"
                                className={classes.sliderItem_PS1}
                                style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_b1340ab4a0c341e88faf0d61a3f39a1d~mv2.png/v1/fill/w_968,h_541,al_c,usm_0.66_1.00_0.01/de661d_b1340ab4a0c341e88faf0d61a3f39a1d~mv2.png)' }}
                            />
                        </Slider>
                    </div>
                    <h1 className={classes.more}>Destaques</h1>
                    <Slider
                        className={classes.publicitySpot2}
                        arrows={false}
                        dots
                        autoplay
                        slidesToShow={1}
                        slidesToScroll={1}
                        autoplaySpeed={5000}
                    >
                        <a
                            href="https://google.com.br"
                            target="_blank"
                            className={classes.sliderItem_PS2}
                            style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_13a7b6eba67645948a07bdd6987e715b~mv2.png/v1/fill/w_454,h_254,al_c,lg_1/de661d_13a7b6eba67645948a07bdd6987e715b~mv2.png)' }}
                        />
                        <a
                            href="https://google.com.br"
                            target="_blank"
                            className={classes.sliderItem_PS2}
                            style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_2cca8274c6ad4eb38bd6e9828a809907~mv2.jpg/v1/fill/w_576,h_322,al_c,lg_1,q_80/de661d_2cca8274c6ad4eb38bd6e9828a809907~mv2.webp)' }}
                        />
                        <a
                            href="https://google.com.br"
                            target="_blank"
                            className={classes.sliderItem_PS2}
                            style={{ backgroundImage: 'url(https://static.wixstatic.com/media/de661d_b1340ab4a0c341e88faf0d61a3f39a1d~mv2.png/v1/fill/w_968,h_541,al_c,usm_0.66_1.00_0.01/de661d_b1340ab4a0c341e88faf0d61a3f39a1d~mv2.png)' }}
                        />
                    </Slider>
                </Panel>
            </Holder>
        );
    }
}

Home = jss({
    holder: {

    },
    title: {
        margin: '15px 0'
    },
    bodyHolder: {
        width: '100%',
        minHeight: '615px',
        display: 'flex',
        justifyContent: 'center'
    },
    upcomingEvents: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    publicitySpot1: {
        width: '300px',
        height: '595px',
        backgroundColor: '#F00',
        marginLeft: '15px'
    },
    sliderItem_PS1: {
        width: '300px',
        height: '595px',
        overflow: 'hidden',
        display: 'block !important',
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    },    
    publicitySpot2: {
        width: '100%',
        height: '400px'
    },
    sliderItem_PS2: {
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        display: 'block !important',
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    }
})(Home);

const mapStateToProps = (state) => ({
    events: state.getIn(['events', 'upcoming'], new List()),
    loading: state.getIn(['events', 'loading'], false),
});

const mapDispatchToProps = {
    getUpcomingEvents
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);