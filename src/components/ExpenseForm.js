import React, { Component } from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

class ExpenseForm extends Component {
  //Using state directly without constructor because of the babel plugin "@babel/plugin-proposal-class-properties",
  //Using class properties instead of methods for the same reason
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount.toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calenderFocused: false,
      error: "",
    };
  }

  //Declaring them as class properties instead of methods(by using arrow function) to prevent using 'this' binding
  /* Never use e.target.value directly in the setState because its callback is asynchronous and by the time
    it executes, it is possible that the value no longer exists! */
  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  handleNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  handleAmountChange = (e) => {
    const amount = e.target.value;
    (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) &&
      this.setState(() => ({ amount }));
    //Using a regex to match favourable strings. Refer http://www.regex101.com
    console.log(this.state.amount);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please fill out both description and amount",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };

  // -------------------SingleDatePicker Component's event handlers ------------------------------------

  handleDateChange = (createdAt) => {
    if (createdAt) this.setState(() => ({ createdAt }));
  };

  handleFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocused: focused }));
  };

  render() {
    return (
      <div>
        {this.state.error}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.handleDateChange}
            focused={this.state.calenderFocused}
            onFocusChange={this.handleFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false} //To allow user to enter the dates in the past as well
            displayFormat="DD MMM YYYY"
          />
          <textarea
            placeholder="Add some note for the expense"
            value={this.state.note}
            onChange={this.handleNoteChange}
          ></textarea>
          <button>{this.props.text}</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
