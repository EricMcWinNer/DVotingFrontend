import React from "react";
import { Link } from "react-router-dom";

import "./sidebar.sass";
import speedometer from "assets/img/icons/speedometer.png";
import UserInfo from "./userinfo";
import OfficialLinks from "./OfficialLinks";
import VoterLinks from "./VoterLinks";
import OfficerLinks from "./OfficerLinks";
import UserManager from "security/UserManager";

function SideBar(props) {
  const userManager = new UserManager(props.user);
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
            {userManager.isOfficial() && <OfficialLinks {...props} />}
            {userManager.isOfficer() && (
              <>
                <OfficerLinks {...props} /> <VoterLinks {...props} />
              </>
            )}
            {userManager.isOnlyVoter() && <VoterLinks {...props} />}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
