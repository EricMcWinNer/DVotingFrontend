import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import AlreadyVoted from "components/cards/already-voted-card";
import "./index.sass";
import fingerpint from "assets/img/icons/fingerprints.png";
import { sentenceCase } from "utils/helpers";
import VerifyIdentityForm from "components/forms/verify-identity";
import BrokenLink from "components/cards/broken-link-card";

function ForwardVoteRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.election === null || props.election.status !== "ongoing" ? (
    <BrokenLink />
  ) : props.voted === true ? (
    <AlreadyVoted />
  ) : (
    <Row id={"vote-forward"}>
      <Col md={8}>
        <BaseCard>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={fingerpint}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>{sentenceCase("verify your identity")}</p>
            </div>
          </div>
          <p className="subtitle poppins">
            You have selected{" "}
            <b>
              {props.party.name} ({props.party.acronym})
            </b>{" "}
            in this election. Before your vote would be counted you have to
            verify your identity.
          </p>
          <VerifyIdentityForm {...props} />
        </BaseCard>
      </Col>
    </Row>
  );
}

export default ForwardVoteRouteView;
