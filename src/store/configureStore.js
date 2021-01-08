import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //Lets us return functions as an action
import expenseReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Passing a function that creates the store to app.js
export default () => {
  const store = createStore(
    //To send 2 or more reducers as parameters to a single store
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
