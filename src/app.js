import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./Routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css"; //A library to reset css code added by browser so that our app starts from the same state in every browser
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import "./firebase/firebase";

const store = configureStore();
console.log("testing");
//Components wrapped in provider can access the redux store. We need to pass the store as a prop to the Provider
const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("container"));
