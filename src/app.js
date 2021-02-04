import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css"; //A library to reset css code added by browser so that our app starts from the same state in every browser
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";
import { startSetExpense } from "./actions/expenses";
import AppRouter, { history } from "./Routers/AppRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import Loader from "./components/Loader";

const store = configureStore();
console.log("testing");
//Components wrapped in provider can access the redux store. We need to pass the store as a prop to the Provider
const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (hasRendered) return;
  ReactDOM.render(<App />, document.getElementById("container"));
  hasRendered = true;
};

ReactDOM.render(<Loader />, document.getElementById("container"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    console.log("Log In");
    store.dispatch(startSetExpense()).then(() => {
      renderApp();
    });
    console.log(user);
    history.location.pathname === "/" && history.push("/dashboard");
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
