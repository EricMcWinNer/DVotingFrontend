import React from "react";
import { Link } from "react-router-dom";

import "./navbar.sass";
import exit from "assets/img/icons/exit.png";
import ring from "assets/img/icons/ring.png";
import LogoWithText from "components/logo/withtext";

function NavbarView(props) {
  return (
    <div id={"navbar"}>
      <div>
        <ul>
          <li id={"brand"}>
            <span className={"helper"}/>
            <Link to={"/home"}>
              <LogoWithText/>
            </Link>
          </li>
        </ul>
        <ul className="float-right iconsList">
          <li className={"text-center"}>
            <Link to={"#"}>
              {/*<img src={ring} className={"navbarIcons text-muted"} alt={"Notifications"}/>*/}
              <i className="fas navbarIcons fa-bell"/>
              <p className="mb-0 text-muted">Notifications</p>
            </Link>
          </li>
          <li className={"text-center"}>
            <Link to={"/logout"}>
              {/*<img src={exit} className={"navbarIcons"} alt={"Log out"}/>*/}
              <i className="fas navbarIcons fa-sign-out-alt"/>
              <p className="mb-0 text-muted">Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarView;
