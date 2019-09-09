import React from "react";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card/BaseCard";
import Helmet from "react-helmet";
import registration from "assets/img/icons/registration.png";
import RegisterForm from "components/forms/register/RegisterController";
import Row from "react-bootstrap/Row";
import BrokenLink from "components/cards/broken-link-card";

function EditVoterRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.voter === null ? (
    <BrokenLink />
  ) : (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Edit Voter</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={registration}
                alt="Edit Voter Information"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Edit Voter</p>
            </div>
          </div>
          <p className="subtitle cartogothic">
            Fill in the form with the correct user details to register the
            voter's information.
          </p>
          <RegisterForm
            url={`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/voters/${props.match.params.id}/edit`}
            cancelUrl={"/dashboard/officer/voters"}
            officerMode
            editMode
            voterInfo={props.voter}
            stayOnPage
            {...props}
          />
        </BaseCard>
      </Col>
    </Row>
  );
}

export default EditVoterRouteView;
