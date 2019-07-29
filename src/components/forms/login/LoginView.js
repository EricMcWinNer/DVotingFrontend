import React from "react";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import "./login.sass";
import LogoWithText from "components/logo/withtext";

function LoginView(props) {
  return (
    <div>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Login</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col
            id={"sideBar"}
            className={"hidden-xs vpHeight hidden-sm hidden-md"}
            lg={4}
          >
            <div className="text-overlay text-center d-flex flex-column h-100 justify-content-center align-items-center">
              <h1 className={"montserrat"}>Welcome Back!</h1>
              <p id={"sidebarP"} className={"poppins"}>
                Please enter your credentials to sign in to your account
              </p>
            </div>
          </Col>
          <Col
            className={"vpHeight standard-padding"}
            xs={12}
            sm={12}
            md={{ offset: 3, span: 6 }}
            lg={{ span: 8, offset: 0 }}
          >
            <LogoWithText
              width={45}
              style={{
                fontSize: 16
              }}
              spanClass={"logoSpan openSans"}
              imgClass={"logoImg"}
            />
            <div
              className={"fullWidth text-center d-flex justify-content-center"}
            >
              <div className={"w-80"}>
                <h1
                  id={"bannerText"}
                  className={"text-center montserrat poppins mt-4"}
                >
                  Sign in to your account
                </h1>
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
                  <Link
                    class={"forgotPassword poppins"}
                    to={"/forgot-password"}
                  >
                    Forgot password?
                  </Link>
                  <button
                    id={"signin-button"}
                    className={"signInButton poppins"}
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginView;
