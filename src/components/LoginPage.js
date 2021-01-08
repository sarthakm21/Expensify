import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => {
  const handleLogin = () => {
    console.log("Motherfucker trying to log in !");
  };
  return (
    <div>
      <input type="text" />
      <button onClick={startLogin}>Login</button>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatch)(LoginPage);
