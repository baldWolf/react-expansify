import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from './../actions/filters';

class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: null
        };
    }
    onDatesChange = ({ startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (focused) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={ (e) => {
                    this.props.dispatch(setTextFilter(e.target.value));
                }}/>
                <select onChange={ (e) => {
                    var func;
                    if ( e.target.value === 'date' ) {
                        func = sortByDate;
                    } else if ( e.target.value === 'amount' ) {
                        func = sortByAmount;
                    }
                    this.props.dispatch(func());
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    startDateId="start_date_id"
                    endDate={this.props.filters.endDate}
                    endDateId="end_date_id"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);