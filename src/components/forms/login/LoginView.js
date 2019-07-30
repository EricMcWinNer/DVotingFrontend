import React from "react";
import { Link } from "react-router-dom";

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
      <Link className={"forgotPassword poppins"} to={"/forgot-password"}>
        Forgot password?
      </Link>
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
    </form>
  );
}

export default LoginView;
