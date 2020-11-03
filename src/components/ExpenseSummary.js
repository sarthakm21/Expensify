import React from "react";
import expensesTotal from "../selectors/expenses-total";
import getVisibleExpenses from "../selectors/expenses";
import { connect } from "react-redux";
import numeral from "numeral";

export const ExpenseSummary = ({ totalExpenses, totalAmount }) => {
  //   const visibleExpenses = getVisibleExpenses(expenses, filters);
  //   const totalAmount = numeral(expensesTotal(visibleExpenses)).format("$0,0.00");
  //   const totalExpenses = visibleExpenses.length;
  return (
    <h2>
      Viewing {totalExpenses} expenses totalling to {totalAmount}
    </h2>
  );
};

const mapState = ({ expenses, filters }) => {
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  const totalAmount = numeral(expensesTotal(visibleExpenses)).format("$0,0.00");
  const totalExpenses = visibleExpenses.length;
  return {
    totalExpenses,
    totalAmount,
  };
};

export default connect(mapState)(ExpenseSummary);
