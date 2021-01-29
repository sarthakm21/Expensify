import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <p>Get your expenses on track</p>
        <button onClick={startLogin} className="button">
          Login with Google
        </button>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatch)(LoginPage);
