import React from "react";
import LogoWithText from "components/logo/withtext/logo";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RegisterForm from "components/forms/register/RegisterController";

import "./index.sass";

function RegisterRouteView(props) {
  return (
    <div id={"registerRoute"} className={"body vpHeight standard-padding"}>
      <LogoWithText extra={"| Registration page"} />
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Register</title>
      </Helmet>
      <Container>
        <Row>
          <Col md={12}>
            <div className="card lg-padding b-100">
              <h2 className={"cartogothic boldHeader"}>
                Electoral Official Registration
              </h2>
              <p className={"openSans"}>
                In order to process your registration, please provide the
                following information, please note that the fields marked with
                an asterisk (*) are required.
              </p>
              <RegisterForm signInRedirect={props.signInRedirect} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterRouteView;
