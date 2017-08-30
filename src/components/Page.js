import React, { PureComponent } from 'react';
import jss from 'react-jss';
import { connect } from 'react-redux';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import Holder from './Holder';
import Panel from './Panel';
import HtmlContent from './HtmlContent';

import { findArticleByLink } from '../redux/Articles';

class Page extends PureComponent {
    componentDidMount = () => this.props.findArticleByLink(this.props.match.url);

    componentWillReceiveProps = (next) => {
        const oldLink = this.props.match.url;
        const newLink = next.match.url;

        if (oldLink !== newLink) {
            this.props.findArticleByLink(next.match.url);
        }
    }

    render = () => {
        const {
            classes,
            loading,
            data
        } = this.props;

        if (loading) {
            return (
                <RefreshIndicator 
                    top={250} 
                    left={(window.innerWidth / 2) - 20} 
                    status="loading" 
                    style={{ zIndex: 99999 }} 
                />
            );
        }

        if (!data) {
            return (<div />);
        }

        return (
            <Holder>
                <Panel>
                    <h1 className={classes.title}>{data.name}</h1>
                    <HtmlContent className={classes.content} content={data.content} />
                </Panel>
            </Holder>
        );
    }
}

Page = jss({
    title: {
        padding: '15px 0',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .85)',
        position: 'sticky',
        top: '224px'
    },
    content: {
        width: '100%'
    }
})(Page);

const mapStateToProps = (state) => ({
    loading: state.getIn(['articles', 'loading']),
    data: state.getIn(['articles', 'currentPage'])
})

const mapDispatchToProps = {
    findArticleByLink
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o })

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Page);