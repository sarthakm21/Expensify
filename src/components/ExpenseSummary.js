import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import expensesTotal from "../selectors/expenses-total";
import getVisibleExpenses from "../selectors/expenses";

export const ExpenseSummary = ({ totalExpenses, totalAmount }) => {
  //   const visibleExpenses = getVisibleExpenses(expenses, filters);
  //   const totalAmount = numeral(expensesTotal(visibleExpenses)).format("$0,0.00");
  //   const totalExpenses = visibleExpenses.length;
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{totalExpenses}</span> expenses totalling to{" "}
          <span>{totalAmount}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
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
