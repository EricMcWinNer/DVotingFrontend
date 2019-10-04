import React from "react";
import ReactTooltip from "react-tooltip";
import { contains } from "utils/helpers";
import { Link } from "react-router-dom";
import election from "assets/img/icons/election.png";
import parties from "assets/img/icons/parties.png";
import candidates from "assets/img/icons/candidates.png";

function VoterLinks(props) {
  return (
    <>
      <div
        data-tip={"View Election Details"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/election") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/election"}>
          <img
            src={election}
            alt={"View Election Details"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"View Political Parties"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/party") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/party"}>
          <img
            src={parties}
            alt={"View Political Parties"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"View Candidates"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/candidates") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/candidates"}>
          <img
            src={candidates}
            alt={"View Candidates"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <ReactTooltip
        place={"right"}
        className={"cartogothic"}
        type="dark"
        effect="solid"
      />
    </>
  );
}
export default VoterLinks;
