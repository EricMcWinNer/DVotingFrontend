import React from "react";
import { Link } from "react-router-dom";

import "./sidebar.sass";
import speedometer from "assets/img/icons/speedometer.png";
import voting from "assets/img/icons/voting.png";
import UserInfo from "./userinfo";
import OfficialLinks from "./OfficialLinks";
import VoterLinks from "./VoterLinks";
import OfficerLinks from "./OfficerLinks";
import UserManager from "security/UserManager";
import LinkButton from "components/buttons/react-router-link-button";
import results from "assets/img/icons/results.png";
import { contains } from "utils/helpers";

function SideBar(props) {
  const userManager = new UserManager(props.user);
  return (
    <div
      id={"sidebar"}
      className={`${props.responsive ? "responsive" : ""}${
        props.clickCount % 2 !== 0 && props.responsive ? " slideIn" : ""
      }`}
    >
      <div className="overlay">
        {props.responsive && (
          <div className={"fullWidth closeContainer"}>
            <div
              className={"closeX"}
              onClick={() => props.setClickCount(props.clickCount + 1)}
            >
              <span className="x">&times;</span>{" "}
              <span className={"text"}>Close</span>
            </div>
          </div>
        )}
        <UserInfo name={props.name} user={props.user} />

        {props.election !== null && props.election.status === "ongoing" && (
          <div className="fullWidth mb-4 mt-0 d-flex justify-content-center">
            <LinkButton
              medium
              className={"confirm-background"}
              to={"/dashboard/vote"}
            >
              <img src={voting} alt={"Vote Now"} className={"sidebarIcon"} />
              Vote now
            </LinkButton>
          </div>
        )}

        <div>
          <ul>
            <li
              className={
                props.location === "/dashboard" ||
                props.location === "/dashboard/" ||
                props.location === "/"
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
                Dashboard Home
              </Link>
            </li>
            {props.election !== null && (
              <>
                {props.election.status === "ongoing" && (
                  <li
                    className={
                      props.location === "/dashboard/vote" ||
                      contains(props.location, "/dashboard/vote/")
                        ? "selected"
                        : ""
                    }
                  >
                    <Link to={"/dashboard/vote"}>
                      <img
                        src={voting}
                        alt={"Vote now"}
                        className={"sidebarIcon"}
                      />
                      Vote Now
                    </Link>
                  </li>
                )}

                {(props.election.status === "ongoing" ||
                  props.election.status === "completed") && (
                  <li
                    className={
                      props.location === "/dashboard/results" ? "selected" : ""
                    }
                  >
                    <Link to={"/dashboard/results"}>
                      <img
                        src={results}
                        alt={"Election Results"}
                        className={"sidebarIcon"}
                      />
                      {(props.election.status === "ongoing" &&
                        "Real-time Results") ||
                        (props.election.status === "completed" &&
                          "View Election Results")}
                    </Link>
                  </li>
                )}
              </>
            )}
            {userManager.isOfficial() && <OfficialLinks {...props} />}
            {userManager.isOfficer() && (
              <>
                <OfficerLinks {...props} /> <VoterLinks {...props} />
              </>
            )}
            {!userManager.isOfficial() && !userManager.isOfficer() && (
              <VoterLinks {...props} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
