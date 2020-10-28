import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setFilterText,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    calenderFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calenderFocused) => {
    this.setState(() => ({ calenderFocused }));
  };

  onTextChange = (e) => {
    this.props.setFilterText(e.target.value);
  };

  onSortChange = (e) => {
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
        <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId="start"
          endDate={this.props.filters.endDate}
          endDateId="end"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calenderFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
          displayFormat="DD MMM YYYY"
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatch = (dispatch) => ({
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setFilterText: (text) => dispatch(setFilterText(text)),
  setStartDate: (date) => dispatch(setStartDate(date)),
  setEndDate: (date) => dispatch(setEndDate(date)),
});
export default connect(mapState, mapDispatch)(ExpenseListFilters);
