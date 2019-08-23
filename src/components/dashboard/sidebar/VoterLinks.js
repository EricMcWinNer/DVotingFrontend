import React from "react";
import { contains } from "utils/helpers";
import { Link } from "react-router-dom";
import election from "assets/img/icons/election.png";
import parties from "assets/img/icons/parties.png";
import candidates from "assets/img/icons/candidates.png";

function VoterLinks(props) {
  return (
    <>
      <li
        className={
          contains(props.location, "/dashboard/election") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/election"}>
          <img
            src={election}
            alt={"View Election Details"}
            className={"sidebarIcon"}
          />
          View Election Details
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
            alt={"View Political Parties"}
            className={"sidebarIcon"}
          />
          View Political Parties
        </Link>
      </li>
      <li
        className={
          contains(props.location, "/dashboard/candidates") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/candidates"}>
          <img
            src={candidates}
            alt={"Manage Candidates"}
            className={"sidebarIcon"}
          />
          View Candidates
        </Link>
      </li>
    </>
  );
}

export default VoterLinks;
