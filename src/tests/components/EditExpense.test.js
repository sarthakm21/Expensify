import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import { EditExpense } from "../../components/EditExpense";
import expenses from "../fixtures/expenseData";

let editExpense, wrapper, history, removeExpense;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(
    <EditExpense
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expenses[1]}
    />
  );
});

test("should render edit expense", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle edit expense", () => {
  const testData = expenses[1];
  //Since the onSubmit called by ExpenseForm does not have an id passed.
  const calledWith = {
    amount: testData.amount,
    note: testData.note,
    createdAt: testData.createdAt,
    description: testData.description,
  };
  wrapper.find(ExpenseForm).prop("onSubmit")(calledWith);
  expect(editExpense).lastCalledWith(testData.id, calledWith);
  expect(history.push).lastCalledWith("/");
});

test("should handle remove expense", () => {
  wrapper.find("button").simulate("click");
  expect(removeExpense).lastCalledWith(expenses[1].id);
});
