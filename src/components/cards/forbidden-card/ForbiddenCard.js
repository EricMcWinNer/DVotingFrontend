import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import forbidden from "assets/img/icons/forbidden.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function ForbiddenCard(props) {
  return (
    <BaseCard>
      <div className="title clearfix o-auto">
        <div className="float-left">
          <img
            src={forbidden}
            alt="Forbidden Route"
            className={"title-icon small"}
          />
        </div>
        <div className="float-left">
          <p className={"title"}>403 Forbidden</p>
        </div>
      </div>
      <p className={"subtitle mt-2"}>
        Sorry, you are not authorized to access this page
      </p>
      <ul className={"no-style m-0 mt-4 o-auto fullWidth clearfix p-0 h-menu"}>
        <li className={"mr-3 float-left"}>
          <LinkButton
            medium
            className={"logo-background"}
            onClick={props.finalizeElection}
            to={"/dashboard/"}
          >
            <i className="fas fa-chevron-left" />
            Back to home
          </LinkButton>
        </li>
      </ul>
    </BaseCard>
  );
}

export default ForbiddenCard;
