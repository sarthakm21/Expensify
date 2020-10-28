import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";

export class CreateExpense extends React.Component {
  onSubmit = (expense) => {
    console.log(expense)
    this.props.addExpense(expense);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div>
          This is the create element
          <ExpenseForm
            onSubmit={this.onSubmit}
            text="Add Expense"
          />
        </div>
      </div>
    );
  }
}

//aka mapDispatchToProps. Does the same thing to dispatch that mapStateToProps does to state
const mapDispatch = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatch)(CreateExpense);
