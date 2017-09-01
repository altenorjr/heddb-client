import React, { PureComponent } from 'react';
import jss from 'react-jss';
import { List } from 'immutable';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import Holder from './Holder';
import Panel from './Panel';
import Events from './Events';

import { getUpcomingEvents } from '../redux/Events';

import publicityZoneFactory from './PublicityZone';

const SidebarPublicityZone = publicityZoneFactory('sidebar');
const HighlightsPublicityZone = publicityZoneFactory('highlights');

class Home extends PureComponent {
    componentDidMount = () => this.props.getUpcomingEvents();

    render = () => {
        const {
            classes,
            loading = false,
            events = new List(),
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
                        <SidebarPublicityZone className={classes.sidebar} />
                    </div>
                    <h1>Destaques</h1>
                    <div className={classes.highlightsHolder}>
                        <HighlightsPublicityZone />
                    </div>
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
    highlightsHolder: {
        width: '100%',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center'
    },
    sidebar: {
        marginLeft: '15px'
    }
})(Home);

const mapStateToProps = (state) => ({
    events: state.getIn(['events', 'upcoming'], new List()),
    loading: state.getIn(['events', 'loading'], false),
    sidebarBanners: state.getIn(['ads', 'sidebar']),
    highlights: state.getIn(['ads', 'sidebar']),
});

const mapDispatchToProps = {
    getUpcomingEvents
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);