import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';

import TopBar from './TopBar';
import Holder from './Holder';
import Panel from './Panel';

import { getAds } from '../redux/Ads';

class WebsiteMasterPage extends PureComponent {
    componentDidMount = () => this.props.getAds();

    render = () => {
        const { 
            children, 
            classes, 
            loading
        } = this.props;

        return (
            <div>
                <TopBar />
                <Holder className={classes.body}>
                    {children}
                </Holder>
                {
                    !loading && (
                        <Holder>
                            <Panel>
                                <p className={classes.curadoria}>
                                    O sucesso deste projeto só se dá graças ao empoderamento feito pela iniciativa Pulsar da <a href="https://www.facebook.com/CuradoriaSocial/" rel="noopener noreferrer" target="_blank">Curadoria Social</a>
                                </p>
                            </Panel>
                        </Holder>
                    )
                }
            </div>
        );
    }
}

WebsiteMasterPage = jss({
    body: {
        paddingTop: '199px'
    },
    curadoria: {
        fontSize: '12px',
        textAlign: 'center',
        padding: '30px 0',
        width: '100%',
        '& a': {
            color: '#5A9CF2'
        }
    }
})(WebsiteMasterPage);

const mapStateToProps = (state) => ({
    loading: state.getIn(['events', 'loading']) || state.getIn(['bands', 'loading']) || state.getIn(['venues', 'loading']) || state.getIn(['articles', 'loading']) || false,
    adsLoading: state.getIn(['ads', 'loading'])
});

const mapDispatchToProps = { getAds };

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteMasterPage);