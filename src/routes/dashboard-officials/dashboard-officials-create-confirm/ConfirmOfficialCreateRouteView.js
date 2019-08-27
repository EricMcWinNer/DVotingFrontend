import React from "react";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import BrokenLinkCard from "components/cards/broken-link-card/BrokenLink";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "react-helmet";
import candidates from "assets/img/icons/candidates.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function ConfirmOfficialCreateRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.prospectiveOfficial === null ? (
    <BrokenLinkCard />
  ) : (
    <Row id={"deleteCandidate"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Create Candidate</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={candidates}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Create Official</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Are you sure you want to make{" "}
            <b>{props.prospectiveOfficial.name}</b> an official?
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <LinkButton
                medium
                className={"confirm-background mr-3"}
                onClick={e => props.handleCreate(e)}
                to={`/dashboard/officials/${props.prospectiveOfficial.id}/delete`}
              >
                {props.creating ? (
                  <i className="fas fa-spinner fa-pulse" />
                ) : (
                  "Yes"
                )}
              </LinkButton>
            </li>
            <li>
              <LinkButton
                medium
                className={"reject-background"}
                to={`/dashboard/officials/create`}
              >
                No
              </LinkButton>
            </li>
          </ul>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default ConfirmOfficialCreateRouteView;
