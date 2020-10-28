import { createStore, combineReducers } from "redux";
import expenseReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";

//Passing a function that creates the store to app.js
export default () => {
  const store = createStore(
    //To send 2 or more reducers as parameters to a single store
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
