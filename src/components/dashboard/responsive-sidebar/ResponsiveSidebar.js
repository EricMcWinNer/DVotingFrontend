import React from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import LinkButton from "components/buttons/react-router-link-button";
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
  const userManager = new UserManager(props.user);
  return (
    <div id={"responsiveSideBar"}>
      <div className={"overlay"}>
        <div className={"menu-link"}>
          <div className={"hamburger"}>
            <div />
            <div />
            <div />
          </div>
        </div>
        <div
          data-tip={"Dashboard home"}
          className={`sidebar-item${
            props.location === "/dashboard" || props.location === "/dashboard/"
              ? " selected"
              : ""
          }`}
        >
          <Link to={"/dashboard"}>
            <img
              src={speedometer}
              alt={"Dashboard home"}
              className={"sidebarIcon"}
            />
          </Link>
        </div>
        {props.election !== null && (
          <>
            {props.election.status === "ongoing" && (
              <div
                data-tip={"Vote now"}
                className={`sidebar-item${
                  contains(props.location, "/dashboard/vote") ? " selected" : ""
                }`}
              >
                <Link to={"/dashboard/vote"}>
                  <img
                    src={voting}
                    alt={"Vote now"}
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
                    "Real-time results") ||
                  (props.election.status === "completed" &&
                    "View election results")
                }
                className={`sidebar-item${
                  props.location === "/dashboard/results" ? " selected" : ""
                }`}
              >
                <Link to={"/dashboard/results"}>
                  <img
                    src={results}
                    alt={"Election Results"}
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
