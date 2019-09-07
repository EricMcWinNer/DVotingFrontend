import React from "react";
import Helmet from "react-helmet";

import "./index.sass";
import brokenLink from "assets/img/icons/broken-link.png";
import BaseCard from "components/cards/base-card";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function BrokenLink(props) {
  return (
    <BaseCard>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | 403 Forbidden</title>
      </Helmet>
      <div className="title clearfix o-auto">
        <div className="float-left">
          <img
            src={brokenLink}
            alt="Broken Link"
            className={"title-icon small"}
          />
        </div>
        <div className="float-left">
          <p className={"title"}>Broken Link</p>
        </div>
      </div>
      <p className="subtitle poppins">
        {props.subtitle !== undefined ? (
          <p className={"subtitle poppins"}>{props.subtitle}</p>
        ) : (
          <p className="subtitle poppins">
            The link you're trying to visit does not exist anymore or has been
            moved to a new address.
          </p>
        )}
      </p>
      <ul className={"no-style m-0 p-0 h-menu"}>
        <li>
          <LinkButton
            className={"button confirm-background"}
            backgroundColor={"#279871"}
            to={`/dashboard`}
          >
            <i className="fas fa-chevron-left" />
            Go back home
          </LinkButton>
        </li>
      </ul>
    </BaseCard>
  );
}

export default BrokenLink;
