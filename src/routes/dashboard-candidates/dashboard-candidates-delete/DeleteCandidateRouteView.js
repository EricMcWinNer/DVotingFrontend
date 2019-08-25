import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import candidates from "assets/img/icons/candidates.png";
import LinkButton from "components/buttons/react-router-link-button";
import BrokenLinkCard from "components/cards/broken-link-card/BrokenLink";

function DeleteCandidateRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.candidate === null ? (
    <BrokenLinkCard />
  ) : (
    <Row id={"deleteCandidate"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Delete Candidate</title>
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
              <p className={"title"}>Delete Candidate</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Are you sure you want to remove <b>{props.candidate.name}</b> from
            the list of candidates?
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <LinkButton
                medium
                className={"confirm-background mr-3"}
                onClick={e => props.handleDelete(e)}
                to={`/dashboard/candidates/${props.candidate.id}/delete`}
              >
                {props.deleting ? (
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
                to={`/dashboard/candidates`}
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

export default DeleteCandidateRouteView;
