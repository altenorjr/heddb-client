import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jss from 'react-jss';

import Events from './Events';
import DropDown from './DropDown';
import FilteredContainer from './FilteredContainer';
import { months as eventMonths, cities as eventCities, filterEvents } from '../data';
import { cities as citiesDefinition } from '../definitions/city';
import { months as monthsDefinition } from '../definitions/month';

class UglyCalendar extends PureComponent {
    static propTypes = {
        months: monthsDefinition,
        cities: citiesDefinition,
        selectedMonth: PropTypes.string.isRequired,
        selectedCity: PropTypes.string.isRequired,
        events: PropTypes.arrayOf(PropTypes.object),
        onSelectedCityChanged: PropTypes.func.isRequired,
        onSelectedMonthChanged: PropTypes.func.isRequired
    }

    selectedMonthChanged = (value) => this.props.onSelectedMonthChanged(value);

    selectedCityChanged = (value) => this.props.onSelectedCityChanged(value);

    createFilter = (props) => <DropDown {...props} />

    render = () => {
        const {
            events,
            months,
            selectedMonth,
            cities,
            selectedCity,
        } = this.props;

        return (
            <FilteredContainer filters={[
                <DropDown {...{
                    items: months,
                    selectedValue: selectedMonth,
                    onSelectedValueChanged: this.selectedMonthChanged
                }} />,
                this.createFilter({
                    items: cities,
                    align: 'right',
                    selectedValue: selectedCity,
                    onSelectedValueChanged: this.selectedCityChanged
                })
            ]}>
                <Events
                    width="100%"
                    events={events}
                    showMonth={selectedMonth === 'all'}
                    fromNow={false} />
            </FilteredContainer>
        );
    }
}

const styles = {

};

const Calendar = jss(styles)(UglyCalendar);

export default Calendar;

const availableMonths = (type) => eventMonths.map(({ value, count, text }) => ({
    value,
    count,
    text: value !== 'all' ? text : type === 'calendar' ? 'Agenda Completa' : type === 'festivals' ? 'Todos os Festivais' : 'Todos os Lançamentos'
}));

export class CalendarConnected extends PureComponent {
    static propTypes = {
        selectedCity: PropTypes.string,
        selectedMonth: PropTypes.string,
        type: PropTypes.oneOf(['calendar', 'festivals', 'releases'])
    }

    static defaultProps = {
        selectedCity: 'all',
        selectedMonth: 'all',
        type: 'calendar',
    }

    state = {
        selectedCity: this.props.selectedCity,
        selectedMonth: this.props.selectedMonth
    }

    render = () => (
        <Calendar
            cities={eventCities}
            selectedCity={this.state.selectedCity}
            onSelectedCityChanged={(selectedCity) => this.setState(() => ({ selectedCity }))}
            months={availableMonths(this.props.type)}
            selectedMonth={this.state.selectedMonth}
            onSelectedMonthChanged={(selectedMonth) => this.setState(() => ({ selectedMonth }))}
            events={filterEvents(this.state.selectedMonth, this.state.selectedCity)}
        />
    )
}