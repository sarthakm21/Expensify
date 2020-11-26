import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenseData";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]); //takes in an optional array of middleware

test("should setup remove expense action generator", () => {
  const removeObject = removeExpense("abc123");
  expect(removeObject).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abc123",
  });
});

test("should setup edit expense generator", () => {
  const editObject = editExpense("abc123", {
    amount: 1000,
    createdAt: 10,
    description: "Coffee",
    notes: "This is just a test. Dont worry",
  });

  expect(editObject).toEqual({
    id: "abc123",
    updates: {
      amount: 1000,
      createdAt: 10,
      description: "Coffee",
      notes: "This is just a test. Dont worry",
    },
    type: "EDIT_EXPENSE",
  });
});

test("should setup add expense action generator with provided params", () => {
  const addObject = addExpense(expenses[2]);
  expect(addObject).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

test("should add expense to the database", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Candies",
    amount: 100,
    createdAt: 1092341,
    note: "The good stranger suddenly stopped giving me candy",
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });
    db.ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //If we use this optional parameter, the jest test case does not run until this param is called
      });
  });
});

test("should add expense to the database with default values", (done) => {
  const store = createMockStore({});
  const expenseDefault = {
    description: "",
    amount: 0,
    createdAt: 0,
    note: "",
  };
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseDefault,
      },
    });
    db.ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done(); //If we use this optional parameter, the jest test case does not run until this param is called
      });
  });
});

// test("should setup add expense action generator with default values", () => {
//   const addObject = addExpense();
//   expect(addObject).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
