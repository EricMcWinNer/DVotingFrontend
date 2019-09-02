import React from "react";
import { contains } from "utils/helpers";
import { Link } from "react-router-dom";
import election from "assets/img/icons/election.png";
import parties from "assets/img/icons/parties.png";
import voter from "assets/img/icons/voter.png";
import candidates from "assets/img/icons/candidates.png";
import official from "assets/img/icons/official.png";
import officer from "assets/img/icons/officer.png";
import registrationPin from "assets/img/icons/padlock.png";

function OfficialLinks(props) {
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
      <li
        className={
          contains(props.location, "/dashboard/voters") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/voters"}>
          <img src={voter} alt={"View Voters"} className={"sidebarIcon"} />
          View Voters
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
          Manage Candidates
        </Link>
      </li>
      <li
        className={
          contains(props.location, "/dashboard/officials") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/officials"}>
          <img
            src={official}
            alt={"Mange Officials"}
            className={"sidebarIcon"}
          />
          Manage Electoral Officials
        </Link>
      </li>
      <li
        className={
          contains(props.location, "/dashboard/officers") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/officers"}>
          <img
            src={officer}
            alt={"Manage Polling Officers"}
            className={"sidebarIcon"}
          />
          Manage Polling Officers
        </Link>
      </li>
      <li
        className={
          contains(props.location, "/dashboard/pins") ? "selected" : ""
        }
      >
        <Link to={"/dashboard/pins"}>
          <img
            src={registrationPin}
            alt={"Manage Registration Pins"}
            className={"sidebarIcon"}
          />
          Manage Registration Pins
        </Link>
      </li>
    </>
  );
}

export default OfficialLinks;
