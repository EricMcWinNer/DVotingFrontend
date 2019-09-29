import React from "react";
import Helmet from "react-helmet";

import "./index.sass";
import notFound from "assets/img/icons/404-error.png";
import BaseCard from "components/cards/base-card";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
function NotFound(props) {
  return (
    <BaseCard>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | 404 Not Found</title>
      </Helmet>
      <div className="title clearfix o-auto">
        <div className="float-left">
          <img
            src={notFound}
            alt="404 Not Found"
            className={"title-icon small"}
          />
        </div>
        <div className="float-left">
          <p className={"title"}>404 Not Found</p>
        </div>
      </div>
      <p className="subtitle poppins">
        Sorry, we couldn't find the link you're trying to reach. It's either
        been moved or it never existed.
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

export default NotFound;
