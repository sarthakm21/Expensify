import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import EditExpense from "../components/EditExpense";
import CreateExpense from "../components/CreateExpense";
import Help from "../components/Help";
import DoesNotExist from "../components/DoesNotExist";

// Switch goes through the Routes orderwise (like Switch in C++/Java) and stops when a match is found.
// This is not the case with a simple div. This prevents the error page from showing up everywhere
// BrowserRouter only expects a single parent element in it, just like components
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/create" component={CreateExpense} />
        <Route path="/edit/:id" component={EditExpense} />
        <Route path="/help" component={Help} />
        <Route component={DoesNotExist} />
      </Switch>
    </div>
  </BrowserRouter>
);

/* Alternate syntax for Route:
  <Route exact path="/">
    <Dashboard />
  </Route>
*/

export default AppRouter;
