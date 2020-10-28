import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <p>This is user sensitive info only for their eyes</p>
    <h3>
      Cursed be thee whose eyes fall upon this knowlegde(other than the owner
      ofc)
    </h3>
    <strong>{props.info}</strong>
  </div>
);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Intruder detected. Prepare for shooting.</p>
      )}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

//AuthInfo has some props which requireAuthentication uses to determine the content the component will have.
//These props are passed down as props to the Info component using spread syntax

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="This is your number" />,
  document.getElementById("container")
);
