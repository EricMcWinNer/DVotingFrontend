import React from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import OfficialLinks from "./OfficialLinks";
import VoterLinks from "./VoterLinks";
import OfficerLinks from "./OfficerLinks";
import voting from "assets/img/icons/voting.png";
import speedometer from "assets/img/icons/speedometer.png";
import results from "assets/img/icons/results.png";
import { contains } from "utils/helpers";
import UserManager from "security/UserManager";

import "./index.sass";

function ResponsiveSidebar(props) {
  const responsiveSideBar = React.createRef();
  const userManager = new UserManager(props.user);
  return (
    <div
      ref={responsiveSideBar}
      className={props.clickCount % 2 !== 0 ? "tuama" : ""}
      id={"responsiveSideBar"}
    >
      <div className={"overlay"}>
        <div
          className={"menu-link"}
          onClick={() => props.setClickCount(props.clickCount + 1)}
        >
          <div className={"hamburger"}>
            <div />
            <div />
            <div />
          </div>
        </div>
        <div
          data-tip={"Dashboard Home"}
          className={`sidebar-item${
            props.location === "/dashboard" || props.location === "/dashboard/"
              ? " selected"
              : ""
          }`}
        >
          <Link to={"/dashboard"}>
            <img
              src={speedometer}
              alt={"Dashboard Home"}
              className={"sidebarIcon"}
            />
          </Link>
        </div>
        {props.election !== null && (
          <>
            {props.election.status === "ongoing" && (
              <div
                data-tip={"Vote Now"}
                className={`sidebar-item${
                  contains(props.location, "/dashboard/vote") ? " selected" : ""
                }`}
              >
                <Link to={"/dashboard/vote"}>
                  <img
                    src={voting}
                    alt={"Vote Now"}
                    className={"sidebarIcon"}
                  />
                </Link>
              </div>
            )}
            {(props.election.status === "ongoing" ||
              props.election.status === "completed") && (
              <div
                data-tip={
                  (props.election.status === "ongoing" &&
                    "Real-time Results") ||
                  (props.election.status === "completed" &&
                    "View Election Results")
                }
                className={`sidebar-item${
                  props.location === "/dashboard/results" ? " selected" : ""
                }`}
              >
                <Link to={"/dashboard/results"}>
                  <img
                    src={results}
                    alt={"View Election Results"}
                    className={"sidebarIcon"}
                  />
                </Link>
              </div>
            )}
            <ReactTooltip
              place={"right"}
              className={"cartogothic"}
              type="dark"
              effect="solid"
            />
          </>
        )}
        {userManager.isOfficial() && <OfficialLinks {...props} />}
        {userManager.isOfficer() && (
          <>
            <OfficerLinks {...props} /> <VoterLinks {...props} />
          </>
        )}
        {userManager.isOnlyVoter() && <VoterLinks {...props} />}
      </div>
      <ReactTooltip
        place={"right"}
        className={"cartogothic"}
        type="dark"
        effect="solid"
      />
    </div>
  );
}

export default ResponsiveSidebar;
