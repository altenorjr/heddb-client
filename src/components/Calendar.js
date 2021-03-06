import React, { Component } from 'react';
import jss from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List } from 'immutable';
import CircularProgress from 'material-ui/CircularProgress';

import Events from './Events';
import DropDown from './DropDown';
import FilteredContainer from './FilteredContainer';

import { filterEvents, selectMonth, selectCity, selectType } from '../redux/Events';

import publicityZoneFactory from './PublicityZone';

import breakpoint from '../breakpoint';

const SidebarPublicityZone = publicityZoneFactory('sidebar');

class Calendar extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        months: PropTypes.instanceOf(List),
        cities: PropTypes.instanceOf(List),
        selectedMonth: PropTypes.string.isRequired,
        selectedCity: PropTypes.string.isRequired,
        events: PropTypes.instanceOf(List),
        selectCity: PropTypes.func.isRequired,
        selectMonth: PropTypes.func.isRequired,
        filterEvents: PropTypes.func.isRequired,
        selectType: PropTypes.func.isRequired
    }

    selectedMonthChanged = (value) => this.props.selectMonth(value);

    selectedCityChanged = (value) => this.props.selectCity(value);

    createFilter = (props) => <DropDown {...props} />

    componentDidMount = () => {
        const currentMonth = moment(new Date()).startOf('month').toISOString();

        this.props.selectType(this.props.type, false);
        this.props.selectCity('all', false);
        this.props.selectMonth(currentMonth, false);

        this.props.filterEvents({
            month: currentMonth,
            city: 'all',
            selectedType: this.props.type,
            loadMetadata: true
        }).then(({ months }) => {
            const currentMonth = moment(new Date()).startOf('month').toISOString();

            if (months.map(m => m.value).indexOf(currentMonth) !== -1) {
                return;
            }

            const nextMonth = months.slice(1).reduce((next, month) =>
                next ?
                    next :
                    moment(month.value).isAfter(currentMonth) ?
                        month.value :
                        null,
                null
            ) || 'all';

            this.props.selectMonth(nextMonth);
        });
    }

    render = () => {
        const {
            classes,
            events,
            months,
            selectedMonth,
            cities,
            selectedCity,
            loading,
            width
        } = this.props;

        return (
            <FilteredContainer
                className={classes.holder}
                loading={loading}
                filters={[
                    this.createFilter({
                        items: months,
                        selectedValue: selectedMonth,
                        onSelectedValueChanged: this.selectedMonthChanged
                    }),
                    this.createFilter({
                        items: cities,
                        align: width > breakpoint ? 'right' : 'left',
                        selectedValue: selectedCity,
                        onSelectedValueChanged: this.selectedCityChanged
                    })
                ]}
            >
                <div className={classes.content}>
                    {
                        loading && (
                            <div className={classes.loadingHolder}>
                                <CircularProgress className={classes.loading} />
                            </div>
                        )
                    }
                    <Events
                        loading={loading}
                        className={classes.events}
                        width="100%"
                        events={events}
                        mini={width <= breakpoint}
                        showMonth={selectedMonth === 'all'}
                        fromNow={false}
                    />
                    <SidebarPublicityZone className={classes.sidebar} />
                </div>
            </FilteredContainer>
        );
    }
}

Calendar = jss({
    holder: {
        position: 'relative',
        [`@media (max-width: ${breakpoint}px)`]: {
            width: '100%'
        }
    },
    content: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    events: {
        flex: 1,
        marginLeft: '5px',
        [`@media (max-width: ${breakpoint}px)`]: {
            marginLeft: '0px'
        }
    },
    sidebar: {
        marginLeft: '15px',
        position: 'sticky',
        top: '274px'
    },
    loadingHolder: {
        width: '100%',
        height: '595px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})(Calendar);

const mapStateToProps = (state) => ({
    events: state.getIn(['events', 'data']),
    cities: state.getIn(['events', 'cities']),
    selectedCity: state.getIn(['events', 'selectedCity']),
    months: state.getIn(['events', 'months']),
    selectedMonth: state.getIn(['events', 'selectedMonth']),
    width: state.getIn(['dimensions', 'width']),
    loading: state.getIn(['events', 'loading'], true)
});

const mapDispatchToProps = {
    filterEvents,
    selectCity,
    selectMonth,
    selectType
};

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o })

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Calendar);