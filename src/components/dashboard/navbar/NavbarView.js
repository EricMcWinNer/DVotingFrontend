import React from "react";
import { Link } from "react-router-dom";

import "./navbar.sass";
import LogoWithText from "components/logo/withtext";
import Notifications from "./notifications";

function NavbarView(props) {
  return (
    <div id={"navbar"}>
      <div>
        <ul className={"navLists"}>
          <li id={"brand"}>
            <span className={"helper"} />
            <Link to={"/home"}>
              <LogoWithText />
            </Link>
          </li>
        </ul>
        <ul className="float-right navLists iconsList">
          <Notifications
            setNotificationsAsRead={props.setNotificationsAsRead}
            notifications={props.notifications}
          />
          <li className={"text-center"}>
            <Link to={"/logout"} onClick={e => props.logOut(e)}>
              {/*<img src={exit} className={"navbarIcons"} alt={"Log out"}/>*/}
              <i className="fas navbarIcons fa-sign-out-alt" />
              <p className="mb-0 text-muted">Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarView;
