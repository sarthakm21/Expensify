import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

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
  const expenseData = {
    description: "Alcohol",
    amount: 1000,
    createdAt: 22,
    note: "Tis illegal at your age :(",
  };
  const addObject = addExpense(expenseData);

  expect(addObject).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test("should setup add expense action generator with default values", () => {
  const addObject = addExpense();
  expect(addObject).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});
