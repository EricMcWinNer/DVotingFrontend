import React from "react";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import LogoWithText from "components/logo/withtext";
import LoginForm from "components/forms/login";
import FullScreenLoader from "components/loaders/fullscreen";

function LoginRouteView(props) {
  return props.componentIsLoading ? (
    <FullScreenLoader />
  ) : (
    <div id={"loginRoute"} className="body-top-border-theme">
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Login</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col
            id={"sideBar"}
            className={"vpHeight d-none d-lg-block standard-padding"}
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
            className={"vpHeight standard-padding standard-padding"}
            xs={12}
            sm={12}
            md={{ offset: 1, span: 10 }}
            lg={{ span: 8, offset: 0 }}
          >
            <LogoWithText />
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
                <LoginForm redirectSignedInUser={props.redirectSignedInUser} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginRouteView;
