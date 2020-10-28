import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import { CreateExpense } from "../../components/CreateExpense";
import expenses from "../fixtures/expenseData";

let addExpense, history, wrapper;

/* A fn provided by jest that runs before each test case runs.
Similarly, there's a afterEach, beforeAll(before any test case runs) 
and afterAll(after all the test cases have run) function */
beforeEach(() => {
  addExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(<CreateExpense addExpense={addExpense} history={history} />);
});

test("should render create expense component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expenses[1]);
  expect(addExpense).lastCalledWith(expenses[1]);
  expect(history.push).lastCalledWith("/");
});
