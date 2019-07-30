import React from "react";
import { Link } from "react-router-dom";

import "./login.sass";

function LoginView() {
  return (
    <form id={"loginForm"} action="#">
      <input
        type="email"
        className={"d-block fullWidth openSans"}
        placeholder={"Email"}
        name={"email"}
      />
      <input
        type="password"
        className={"d-block fullWidth openSans"}
        placeholder={"Password"}
        name={"password"}
      />
      <Link className={"forgotPassword poppins"} to={"/forgot-password"}>
        Forgot password?
      </Link>
      <button id={"signin-button"} className={"signInButton poppins"}>
        Sign In
      </button>
    </form>
  );
}

export default LoginView;
