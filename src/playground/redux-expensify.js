import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = new Date(),
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    amount,
    note,
    description,
    createdAt,
  },
});

//REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

//SET_FILTER_TEXT
const setFilterText = (text = "") => ({
  type: "SET_FILTER_TEXT",
  text,
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

//SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

//SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

//Expense Reducer
const expenseReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];

    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);

    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else return expense;

        //Object spread syntax does not work with many browsers so we need to add a babel plugin for this.
      });

    default:
      return state;
  }
};

//Filter Reducer
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_FILTER_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };

    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };

    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };

    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };

    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses
    .filter((expense) => {
      const startDateMatches =
        typeof startDate !== "number" || expense.createdAt >= startDate;

      const endDateMatches =
        typeof endDate !== "number" || expense.createdAt <= endDate;

      const textMatches = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatches && endDateMatches && textMatches;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt > b.createdAt ? -1 : 1;
      } else {
        return a.amount > b.amount ? -1 : 1;
      }
    });
};

//Store
const store = createStore(
  //To send 2 or more reducers as parameters to a single store
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  console.log(getVisibleExpenses(state.expenses, state.filters));
});

store.dispatch(sortByAmount());

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 10, createdAt: 125 })
);

/*The dispatchers return the action object back. So, 
  expenseOne = 
  {
    type: "ADD_EXPENSE",
    expense: {
      id: <Some randomly generated id>,
      amount: 10000,
      note: '',
      description: 'Rent',
      createdAt: <Date at which program runs>,
    }
  } */

const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 100, createdAt: 100 })
);
