import React from "react";
import Helmet from "react-helmet";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import brokenLink from "assets/img/icons/warning.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function AlreadyVotedCard(props) {
  return (
    <BaseCard>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Already voted</title>
      </Helmet>
      <div className="title clearfix o-auto">
        <div className="float-left">
          <img
            src={brokenLink}
            alt="Already voted in current election"
            className={"title-icon small"}
          />
        </div>
        <div className="float-left">
          <p className={"title"}>You have already voted</p>
        </div>
      </div>
      <p className="subtitle poppins">
        {props.subtitle !== undefined ? (
          <p className={"subtitle poppins"}>{props.subtitle}</p>
        ) : (
          <p className="subtitle poppins">
            Every user is allowed to vote only once during an election. You have
            already voted in this election. Click on the link below to view the
            results of the election.
          </p>
        )}
      </p>
      <ul className={"no-style m-0 p-0 h-menu"}>
        <li>
          <LinkButton
            medium
            className={"button cool-purple-background"}
            backgroundcolor={"#279871"}
            to={`/dashboard/results`}
          >
            <i className="fas fa-chart-bar" />
            View Results
          </LinkButton>
        </li>
      </ul>
    </BaseCard>
  );
}

export default AlreadyVotedCard;
