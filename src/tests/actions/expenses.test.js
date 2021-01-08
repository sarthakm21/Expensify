import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  editExpense,
  setExpense,
  removeExpense,
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenseData";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]); //takes in an optional array of middleware
const uid = "some heavy duty uid";
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  let expensesData = {};
  expenses.forEach(({ id, ...expense }) => {
    expensesData[Number(id)] = expense;
  });
  db.ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done()); //the done method ensures that the tests wait for this data fetching to finish before running
});

test("should setup remove expense action generator", () => {
  const removeObject = removeExpense("abc123");
  expect(removeObject).toEqual({
    type: "REMOVE_EXPENSE",
    id: "abc123",
  });
});

test("should remove expense from firebase", (done) => {
  const expense = {
    id: "abc123",
    amount: 1000,
    createdAt: 10,
    description: "Coffee",
    notes: "This is just a test. Dont worry",
  };

  const store = createMockStore({ expense, ...defaultAuthState });
  store.dispatch(startRemoveExpense(expense.id));
  db.ref(`users/${uid}/expenses/${expense.id}`)
    .once("value")
    .then((snapshot) => expect(snapshot.val()).toBeNull())
    .then(() => done());
});

test("should setup edit expense generator", () => {
  const id = "abc123";
  const updates = {
    amount: 1000,
    createdAt: 10,
    description: "Coffee",
    notes: "This is just a test. Dont worry",
  };
  const editObject = editExpense(id, updates);

  expect(editObject).toEqual({
    type: "EDIT_EXPENSE",
    id,
    updates,
  });
});

test("should edit expenses in firebase", (done) => {
  const id = "abc123";
  const updates = {
    amount: 1000,
    createdAt: 10,
    description: "Coffee",
    notes: "This is just a test. Dont worry",
  };

  const store = createMockStore({
    id,
    ...updates,
    amount: 0,
    ...defaultAuthState,
  });
  store.dispatch(startEditExpense(id, updates));
  db.ref(`users/${uid}/expenses/${id}`)
    .once("value")
    .then((snapshot) => expect(snapshot.val()).toEqual(updates))
    .then(() => done());
});

test("should add expense to the database", (done) => {
  const store = createMockStore(defaultAuthState);
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
    db.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
      })
      .then(() => done()); //If we use this optional parameter, the jest test case does not run until this param is called;
  });
});

test("should add expense to the database with default values", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefault = {
    description: "",
    amount: 0,
    createdAt: 0,
    note: "",
  };
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    db.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
      })
      .then(() => done());
  });
});

test("should setup set expense with correct data", () => {
  const action = setExpense(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSE",
    expenses,
  });
});

test("should fetch expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store
    .dispatch(startSetExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "SET_EXPENSE",
        expenses,
      });
    })
    .then(() => done());
});
