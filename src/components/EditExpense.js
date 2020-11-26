import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpense extends React.Component {
  onSubmit = (expense) => {
    //Func. gets called by the submit event handler in the form which passes the new data as a parameter
    console.log(expense);
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id); //Can also use props.match.params.id since both are same
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense} //The expense received from mapStateToProps, i.e. the expense with an id same as the props.match.params.id
          onSubmit={this.onSubmit}
          text="Edit Expense"
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(
    (expense) => expense.id === props.match.params.id
  ),
});

const mapDispatch = (dispatch) => ({
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
});

export default connect(mapStateToProps, mapDispatch)(EditExpense);
