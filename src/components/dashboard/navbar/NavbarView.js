import React from "react";
import { Link } from "react-router-dom";

import "./navbar.sass";
import LogoWithText from "components/logo/withtext";
import Notifications from "./notifications";
import voting from "assets/img/icons/voting.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function NavbarView(props) {
  const election =
    props.notifications === null ? null : props.notifications.election;
  return (
    <div id={"navbar"}>
      <div className={"nav-item"}>
        <div id="brand">
          <span className={"helper"} />
          <Link to={"/dashboard"}>
            <LogoWithText />
          </Link>
        </div>
      </div>
      {election !== null && election.status === "ongoing" && (
        <div className="nav-item ml-auto">
          <LinkButton
            medium
            className={"confirm-background navbar-vote"}
            to={"/dashboard/vote"}
          >
            <img src={voting} alt={"Vote Now!"} />
            Vote Now
          </LinkButton>
        </div>
      )}
      <Notifications
        setNotificationsAsRead={props.setNotificationsAsRead}
        notifications={props.notifications}
      />
      <div className="text-center nav-item">
        <Link to={"/logout"} onClick={e => props.logOut(e)}>
          {/*<img src={exit} className={"navbarIcons"} alt={"Log out"}/>*/}
          <i className="fas navbarIcons fa-sign-out-alt" />
          <p className="mb-0 text-muted">Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default NavbarView;
