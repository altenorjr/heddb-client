import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import jss from 'react-jss';
import breakpoint from '../breakpoint';

import TopBar from './TopBar';
import Holder from './Holder';
import Panel from './Panel';

import { getAds } from '../redux/Ads';
import withDimensions from './hoc/withDimensions';
import { updateDimensions } from '../redux/dimensions';

class WebsiteMasterPage extends PureComponent {
    componentWillMount = () => this.props.getAds();

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dimensions.width !== this.props.dimensions.width) {
            this.props.updateDimensions(nextProps.dimensions);
        }
    }

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

WebsiteMasterPage = withDimensions(jss({
    body: {
        paddingTop: '199px',
        [`@media (max-width: ${breakpoint}px)`]: {
            paddingTop: '100px'
        }
    },
    curadoria: {
        fontSize: '12px',
        textAlign: 'center',
        padding: '30px 0',
        width: '100%',
        '& a': {
            color: '#5A9CF2'
        }
    },
    bannerHolder: {
        width: '100%',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'   
    }
})(WebsiteMasterPage));

const mapStateToProps = (state) => ({
    loading: state.getIn(['events', 'loading']) || state.getIn(['bands', 'loading']) || state.getIn(['venues', 'loading']) || state.getIn(['articles', 'loading']) || false,
    adsLoading: state.getIn(['ads', 'loading']),
    width: state.getIn(['dimensions', 'width'])
});

const mapDispatchToProps = { 
    getAds,
    updateDimensions
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteMasterPage);