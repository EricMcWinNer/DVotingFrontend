import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import BrokenLink from "components/cards/broken-link-card";
import LinkButton from "components/buttons/react-router-link-button";
import IconBadge from "components/badges/icon-badge";
import { capitalize } from "utils/helpers";
import voters from "assets/img/icons/voter.png";

function SingleVoterRouteView(props) {
  let rolesView;
  if (!props.componentIsLoading) {
    rolesView = JSON.parse(props.voter.roles)
      .reverse()
      .map((role, index) => (
        <IconBadge className={`${role}`} key={index + 1}>
          {role === "voter" && <i className="fas fa-person-booth" />}
          {role === "official" && <i className="fas fa-users-cog" />}
          {capitalize(role)}
        </IconBadge>
      ));
  }

  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.voter === null ? (
    <BrokenLink />
  ) : (
    <Row id={"voter"}>
      <Col md={8}>
        <BaseCard>
          <Helmet>
            <title>
              {process.env.REACT_APP_NAME} | {props.voter.name}
            </title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={voters}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Voter Information</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Below you can see the complete details of {props.voter.name}
          </p>
          <div className="text">
            <Row>
              <Col md={{ span: 4, offset: 0 }}>
                <img
                  alt={props.voter.name}
                  src={`${process.env.REACT_APP_API_PATH}/storage/${props.voter.picture}`}
                  className={"profile-picture fullWidth"}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 10, offset: 0 }}>
                <p className={"voterName"}>{props.voter.name}</p>
              </Col>
            </Row>
            <div className="content-container">
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="far fa-envelope" />
                    Email Address:
                  </p>
                  <p>{props.voter.email}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-user-tag" />
                    Roles:
                  </p>
                  {rolesView}
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-venus-mars" />
                    Gender:
                  </p>
                  <IconBadge className={props.voter.gender} fixedWidth={70}>
                    {props.voter.gender === "male" && (
                      <i className="fas fa-male" />
                    )}
                    {props.voter.gender === "female" && (
                      <i className="fas fa-female" />
                    )}
                    {capitalize(props.voter.gender)}
                  </IconBadge>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="far fa-calendar" />
                    Date of birth:
                  </p>
                  <p>{props.voter.age.dob_string}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-ring" />
                    Marital Status:
                  </p>
                  <IconBadge
                    className={props.voter.marital_status}
                    fixedWidth={70}
                  >
                    {capitalize(props.voter.marital_status)}
                  </IconBadge>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-mobile-alt" />
                    Phone Number:
                  </p>
                  <p>{props.voter.phone_number}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-map-marked-alt" />
                    State:
                  </p>
                  <p>{props.voter.state}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-map-marker-alt" />
                    LGA:
                  </p>
                  <p>{props.voter.lga}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-map-signs" />
                    Address 1:
                  </p>
                  <p>{props.voter.address1}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-map-signs" />
                    Address 2:
                  </p>
                  <p>{props.voter.address2}</p>
                </div>
              </Row>
              <Row>
                <div className={"detail"}>
                  <p className="detailTitle">
                    <i className="fas fa-calendar-plus" />
                    Date Created:
                  </p>
                  <p>{props.voter.date_created}</p>
                </div>
              </Row>
              <Row className={"mt-4"}>
                <LinkButton
                  className={"reject-background ml-0"}
                  to={"/dashboard/voters"}
                >
                  <i className="fas fa-chevron-left" />
                  Back to voters
                </LinkButton>
              </Row>
            </div>
          </div>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default SingleVoterRouteView;
