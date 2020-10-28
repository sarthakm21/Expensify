import { createStore } from "redux";

//In the flux architecture, the state is separated completely from the React-components into its own stores.
//A reducer defines the impact on store due to some action

//1. Reducers are Pure Functions, i.e they never use some data outside of their scope.
//2. Reducers never directly modify the state or action. They just return the new values.
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

//subscribe is used to perform some action whenever the state changes in our store.
//Its return value is a function which can be called to unsubscribe from the store.
const unsubscibe = store.subscribe(() => {
  console.log(store.getState());
});

//Action generators: Functions that return action objects. Using action generators is a much better practice than
//explicitly defining the action object each time data is dispatched to the store
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy,
});

//Destructuring incrementBy from object passed. If no object is passed, an empty object is set as default value and
//incrementBy is set to 1. So, if there is no object passed, incrementBy won't get retrieved and its value will be 1
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});

const resetCount = () => ({
  type: "RESET",
});

const setCount = ({ count }) => ({
  type: "SET",
  count,
});

//This sends a action object with type INCREMENT to the createStore function. Action changes the state of the store
store.dispatch(incrementCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(resetCount());

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(setCount({ count: 25 }));

unsubscibe(); //Calling this return function will stop executing the console.log() when state changes

store.dispatch(incrementCount({ incrementBy: 10 }));
