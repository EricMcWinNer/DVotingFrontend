import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

import "./sidebar.sass";
import speedometer from "assets/img/icons/speedometer.png";
import UserInfo from "./userinfo";
import OfficialLinks from "./OfficialLinks";
import VoterLinks from "./VoterLinks";

function SideBar(props) {
  return (
    <div id={"sidebar"}>
      <div className="overlay">
        <UserInfo name={props.name} user={props.user} />
        <div>
          <ul>
            <li
              className={
                props.location === "/dashboard" ||
                props.location === "/dashboard/"
                  ? "selected"
                  : ""
              }
            >
              <Link to={"/dashboard"}>
                <img
                  src={speedometer}
                  alt={"Dashboard home"}
                  className={"sidebarIcon"}
                />
                Dashboard home
              </Link>
            </li>
            {props.user.roles.includes("official") ? (
              <OfficialLinks {...props} />
            ) : (
              <VoterLinks {...props} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
