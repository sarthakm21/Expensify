import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

//We use Link to render a page from Client Side directly and do not need the App to request the server first, reducing loading time
//NavLink is similar to link, with extra props like activeClassName and some more. Check the docs for more
export const Header = ({ startLogout }) => (
  <div>
    <h1>Expensify</h1>
    <NavLink to="/create" activeClassName="isActive">
      Create Expense
    </NavLink>
    <NavLink to="/dashboard" activeClassName="isActive">
      Dashboard
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </div>
);

const mapDispatch = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatch)(Header);
