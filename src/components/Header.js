import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

//We use Link to render a page from Client Side directly and do not need the App to request the server first, reducing loading time
//NavLink is similar to link, with extra props like activeClassName and some more. Check the docs for more
export const Header = ({ startLogout }) => (
  <div className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button onClick={startLogout} className="button button--link">
          Logout
        </button>
      </div>
    </div>
  </div>
);

const mapDispatch = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatch)(Header);
