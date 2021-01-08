import db from "../firebase/firebase";

//ADD_EXPENSE
const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return db
      .ref(`users/${uid}/expenses`) //returning this so that the tests can be run on this
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

const startRemoveExpense = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    db.ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
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

const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    db.ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      })
      .catch((e) => console.log("Some error occured", e));
  };
};

//SET EXPENSE
const setExpense = (expenses) => ({
  type: "SET_EXPENSE",
  expenses,
});

const startSetExpense = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((child) => {
          expenses.push({ id: child.key, ...child.val() });
        });
        dispatch(setExpense(expenses));
      })
      .catch((e) => console.log("Some error occured", e));
  };
};

export {
  addExpense,
  removeExpense,
  editExpense,
  setExpense,
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startSetExpense,
};
