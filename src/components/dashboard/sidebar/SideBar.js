import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

import "./sidebar.sass";
import speedometer from "assets/img/icons/speedometer.png";
import candidates from "assets/img/icons/candidates.png";
import election from "assets/img/icons/election.png";
import parties from "assets/img/icons/parties.png";
import official from "assets/img/icons/official.png";
import officer from "assets/img/icons/officer.png";
import voter from "assets/img/icons/voter.png";
import UserInfo from "./userinfo";
import { contains } from "utils/helpers";

function SideBar(props) {
  return (
    <div id={"sidebar"}>
      <div className="overlay">
        <UserInfo name={props.name} user={props.user} />
        <div>
          <ul>
            <li className={props.location === "/dashboard" ? "selected" : ""}>
              <Link to={"/dashboard"}>
                <img
                  src={speedometer}
                  alt={"Dashboard home"}
                  className={"sidebarIcon"}
                />
                Dashboard home
              </Link>
            </li>
            <li
              className={
                contains(props.location, "/dashboard/election")
                  ? "selected"
                  : ""
              }
            >
              <Link to={"/dashboard/election"}>
                <img
                  src={election}
                  alt={"Manage Election"}
                  className={"sidebarIcon"}
                />
                Manage Election
              </Link>
            </li>
            <li
              className={
                contains(props.location, "/dashboard/party") ? "selected" : ""
              }
            >
              <Link to={"/dashboard/party"}>
                <img
                  src={parties}
                  alt={"Manage Political Parties"}
                  className={"sidebarIcon"}
                />
                Manage Political Parties
              </Link>
            </li>
            <li>
              <Link to={"/polls"}>
                <img
                  src={voter}
                  alt={"View Voters"}
                  className={"sidebarIcon"}
                />
                View Voters
              </Link>
            </li>
            <li>
              <Link to={"/candidates"}>
                <img
                  src={candidates}
                  alt={"Manage Candidates"}
                  className={"sidebarIcon"}
                />
                Mange Candidates
              </Link>
            </li>
            <li>
              <Link to={"/officials"}>
                <img
                  src={official}
                  alt={"Mange Officials"}
                  className={"sidebarIcon"}
                />
                Manage Officials
              </Link>
            </li>
            <li>
              <Link to={"/polls"}>
                <img
                  src={officer}
                  alt={"Manage Polling Officers"}
                  className={"sidebarIcon"}
                />
                Manage Polling Officers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
