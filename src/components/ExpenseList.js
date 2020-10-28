import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
  <div>
    {props.expenses.length === 0
      ? "Add an expense"
      : props.expenses.map((expense) => (
          <ExpenseListItem key={expense.id} {...expense} />
          //Using spread syntax passes props with the same key value pair as that present in the expense object
        ))}
  </div>
);

//Return value of connect is a HOC to which we pass the component in which we want to use redux store
//The connect function takes in a callback function that lets us pass the values of the store that will be passed to
//our Wrapped component as props. Here we only need to pass the expenses array.
const mapStateToProps = (state) => {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
