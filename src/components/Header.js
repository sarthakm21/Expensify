import React from "react";
import { NavLink } from "react-router-dom";

//We use Link to render a page from Client Side directly and do not need the App to request the server first, reducing loading time
//NavLink is similar to link, with extra props like activeClassName and some more. Check the docs for more
const Header = () => (
  <div>
    <h1>Expensify</h1>
    <NavLink to="/create" activeClassName="isActive">
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="isActive">
      Help
    </NavLink>
    <NavLink to="/" activeClassName="isActive" exact={true}>
      Dashboard
    </NavLink>
  </div>
);

export default Header;
