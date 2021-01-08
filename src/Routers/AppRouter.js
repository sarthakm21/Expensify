import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "../components/Dashboard";
import EditExpense from "../components/EditExpense";
import CreateExpense from "../components/CreateExpense";
import DoesNotExist from "../components/DoesNotExist";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Switch goes through the Routes orderwise (like Switch in C++/Java) and stops when a match is found.
// This is not the case with a simple div. This prevents the error page from showing up everywhere
// BrowserRouter only expects a single parent element in it, just like components
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create" component={CreateExpense} />
        <PrivateRoute path="/edit/:id" component={EditExpense} />
        <Route component={DoesNotExist} />
      </Switch>
    </div>
  </Router>
);

/* Alternate syntax for Route:
  <Route exact path="/">
    <Dashboard />
  </Route>
*/

export default AppRouter;
