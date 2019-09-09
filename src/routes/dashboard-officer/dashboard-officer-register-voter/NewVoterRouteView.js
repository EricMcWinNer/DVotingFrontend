import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Helmet from "react-helmet";
import registration from "assets/img/icons/registration.png";
import RegisterForm from "components/forms/register/RegisterController";

function NewVoterRouteView(props) {
  return (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Register Voter</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={registration}
                alt="Register new Voter"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Register Voter</p>
            </div>
          </div>
          <p className="subtitle cartogothic">
            Fill in the form with the correct user details to register the user.
          </p>
          <RegisterForm
            url={`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/register`}
            cancelUrl={"/dashboard"}
            officerMode
            stayOnPage
            {...props}
          />
        </BaseCard>
      </Col>
    </Row>
  );
}

export default NewVoterRouteView;
