import { v4 as uuid } from "uuid";
import db from "../firebase/firebase";

//ADD_EXPENSE
const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return db
      .ref("expenses") //returning this so that the tests can be run on this
      .push(expense)
      .then((data) => {
        dispatch(
          addExpense({
            id: data.key,
            ...expense,
          })
        );
      })
      .catch((e) => console.log("Some error occured", e));
  };
};

//REMOVE_EXPENSE
const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    db.ref(`expenses/${id}`)
      .remove()
      .then((data) => {
        dispatch(removeExpense(id));
      })
      .catch((e) => console.log("Some error occured", e));
  };
};

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    db.ref(`expenses/${id}`)
      .update(updates)
      .then((data) => {
        dispatch(editExpense(id, updates));
      })
      .catch((e) => console.log("Some error occured", e));
  };
};

export { addExpense, removeExpense, editExpense };
