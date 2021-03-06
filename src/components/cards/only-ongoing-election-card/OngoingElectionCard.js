import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card/BaseCard";
import noOngoingElection from "assets/img/icons/lockedstopwatch.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function OngoingElection(props) {
  const userManager = props.userManager;
  return (
    <BaseCard>
      <div className="title clearfix o-auto">
        <div className="float-left">
          <img
            src={noOngoingElection}
            alt="No Ongoing Election"
            className={"title-icon small"}
          />
        </div>
        <div className="float-left">
          <p className={"title"}>No Ongoing Election</p>
        </div>
      </div>
      <p className={"subtitle mt-2"}>
        {userManager.isOfficial() ? (
          <span>
            There is no ongoing election on the app now. Click the link below to
            manage the current election.
          </span>
        ) : (
          <span>
            This link cannot be opened unless there is an ongoing election. You
            will be notified when an election starts.
          </span>
        )}
      </p>
      <ul className={"no-style m-0 mt-4 o-auto fullWidth clearfix p-0 h-menu"}>
        <li className={"mr-3 float-left"}>
          <LinkButton
            medium
            className={"logo-background"}
            to={userManager.isOfficial ? "/dashboard/election" : "/dashboard/"}
          >
            <i className="fas fa-chevron-left" />
            {userManager.isOfficial() ? (
              <span>Create an Election</span>
            ) : (
              <span>Back to home</span>
            )}
          </LinkButton>
        </li>
      </ul>
    </BaseCard>
  );
}

export default OngoingElection;
