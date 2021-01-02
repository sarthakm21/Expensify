import expenseReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenseData";
import moment from "moment";

test("should setup default store values", () => {
  const action = { type: "@@INIT" };
  const state = expenseReducer(undefined, action);
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "random-bullshit-go",
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add a new expense", () => {
  const expense = {
    amount: 1000,
    description: "Assorted Muffins",
    id: "4",
    note: "",
    createdAt: moment(0),
  };

  const action = {
    type: "ADD_EXPENSE",
    expense,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const updates = {
    description: "Rent for 2 months",
  };

  const action = {
    type: "EDIT_EXPENSE",
    id: "2",
    updates,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    { ...expenses[1], ...updates },
    expenses[2],
  ]);
});

test("should not edit an expense if id not found", () => {
  const updates = {
    description: "Rent for 2 months",
    note: "",
    createdAt: moment(0).subtract(4, "days").valueOf(),
    amount: 10050,
  };

  const action = {
    type: "EDIT_EXPENSE",
    id: "random-bullshit-go",
    updates,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const finalExpenses = [expenses[1], expenses[2]];
  const setAction = {
    type: "SET_EXPENSE",
    expenses: finalExpenses,
  };

  const state = expenseReducer(expenses, setAction);
  expect(state).toEqual(finalExpenses);
});
