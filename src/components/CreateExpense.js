import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses";

export class CreateExpense extends React.Component {
  onSubmit = (expense) => {
    console.log(expense);
    this.props.startAddExpense(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div>
          This is the create element
          <ExpenseForm onSubmit={this.onSubmit} text="Add Expense" />
        </div>
      </div>
    );
  }
}

//aka mapDispatchToProps. Does the same thing to dispatch that mapStateToProps does to state, i.e.
//sends some specific part of the dispatch methods to the component as props
const mapDispatch = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
});

//udnefined as the first parameter because we dont need the mapStateToProps.
export default connect(undefined, mapDispatch)(CreateExpense);
