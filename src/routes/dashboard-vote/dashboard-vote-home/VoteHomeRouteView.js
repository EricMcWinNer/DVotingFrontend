import React from "react";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import "./index.sass";
import Helmet from "react-helmet";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card/BaseCard";
import BrokenLink from "components/cards/broken-link-card";
import fingerpint from "assets/img/icons/fingerprints.png";
import VotePartyCard from "components/cards/vote-party-card";
import Row from "react-bootstrap/Row";
import SweetAlert from "react-bootstrap-sweetalert";

function VoteHomeRouteView(props) {
  const parties =
    props.parties === null
      ? null
      : props.parties.map((party, index) => (
          <VotePartyCard
            party={party}
            selectedParty={props.selectedParty}
            handleClick={props.handlePartyCardClick}
            triggerConfirmAlert={props.triggerConfirmAlert}
            key={index}
            index={index}
          />
        ));
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.election === null || props.election.status !== "ongoing" ? (
    <BrokenLink />
  ) : (
    <Row id={"votesHome"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Vote Now!</title>
      </Helmet>
      <Col md={{ span: 12 }}>
        <BaseCard id={"nullCard"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={fingerpint}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Voting Section</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can vote in the current election. All the
            political parties involved in this election are listed below, you
            can pick the one you choose and proceed to vote in this election.
          </p>
          <div className="parties-container">{parties}</div>
          {!props.componentIsLoading && props.showErrorAlert && (
            <SweetAlert
              type={props.alertType}
              allowEscape
              closeOnClickOutside
              title={props.errorTitle}
              showCancel={true}
              onConfirm={
                (typeof props.alertCallBack).toLowerCase() === "function"
                  ? props.alertCallBack
                  : props.closeErrorModal
              }
              onCancel={props.closeErrorModal}
            >
              <span className="cartogothic">{props.errorMessage}</span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default VoteHomeRouteView;
