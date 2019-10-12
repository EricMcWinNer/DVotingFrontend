import React from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import "./login.sass";

function LoginView(props) {
  return (
    <form id={"loginForm"} action="#">
      <input
        type="email"
        className={"d-block fullWidth openSans"}
        placeholder={"Email"}
        name={"email"}
        value={props.email}
        onChange={e => props.handleChange(e)}
      />
      <input
        type="password"
        className={"d-block fullWidth openSans"}
        placeholder={"Password"}
        name={"password"}
        value={props.password}
        onChange={e => props.handleChange(e)}
      />
      <button
        id={"signin-button"}
        onClick={props.handleSubmit}
        className={"signInButton poppins"}
      >
        {props.formIsSubmitting ? (
          <i className="fas fa-spinner fa-pulse" />
        ) : (
          "Sign In"
        )}
      </button>
      {!props.componentIsLoading && props.showErrorAlert && (
        <SweetAlert
          type={props.alertType}
          allowEscape
          closeOnClickOutside
          title={props.errorTitle}
          onConfirm={
            (typeof props.alertCallBack).toLowerCase() === "function"
              ? props.alertCallBack
              : props.closeErrorModal
          }
          cancelBtnBsStyle="default"
          onCancel={props.closeErrorModal}
        >
          <span className="cartogothic">{props.errorMessage}</span>
        </SweetAlert>
      )}
    </form>
  );
}

export default LoginView;
