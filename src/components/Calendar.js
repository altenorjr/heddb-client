import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Events from './Events';
import DropDown from './DropDown';
import FilteredContainer from './FilteredContainer';

import { filterRecords, selectMonth, selectCity } from '../redux/Events';

class Calendar extends Component {
    static propTypes = {
        months: PropTypes.instanceOf(List),
        cities: PropTypes.instanceOf(List),
        selectedMonth: PropTypes.string.isRequired,
        selectedCity: PropTypes.string.isRequired,
        events: PropTypes.instanceOf(List),
        selectCity: PropTypes.func.isRequired,
        selectMonth: PropTypes.func.isRequired,
        filterRecords: PropTypes.func.isRequired
    }

    selectedMonthChanged = (value) => this.props.selectMonth(value);

    selectedCityChanged = (value) => this.props.selectCity(value);

    createFilter = (props) => <DropDown {...props} />

    componentDidMount = () => this.props.filterRecords({ month: this.props.selectedMonth, city: this.props.selectedCity });

    render = () => {
        const {
            events,
            months,
            selectedMonth,
            cities,
            selectedCity,
            loading
        } = this.props;

        return (
            <FilteredContainer filters={[
                this.createFilter({
                    items: months,
                    selectedValue: selectedMonth,
                    onSelectedValueChanged: this.selectedMonthChanged
                }),
                this.createFilter({
                    items: cities,
                    align: 'right',
                    selectedValue: selectedCity,
                    onSelectedValueChanged: this.selectedCityChanged
                })
            ]}>
                {
                    loading && (
                        <RefreshIndicator top={100} left={(window.innerWidth / 2) - 20} status="loading" />
                    )
                }
                {
                    !loading && (
                        <Events
                            width="100%"
                            events={events}
                            showMonth={selectedMonth === 'all'}
                            fromNow={false}
                        />
                    )
                }
            </FilteredContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.getIn(['events', 'data']),
    cities: state.getIn(['events', 'cities']),
    selectedCity: state.getIn(['events', 'selectedCity']),
    months: state.getIn(['events', 'months']),
    selectedMonth: state.getIn(['events', 'selectedMonth']),
    loading: state.getIn(['events', 'loading'], true)
});

const mapDispatchToProps = { filterRecords, selectCity, selectMonth };

const mergeProps = (s, d, o) => ({ ...s, ...d, ...o })

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Calendar);