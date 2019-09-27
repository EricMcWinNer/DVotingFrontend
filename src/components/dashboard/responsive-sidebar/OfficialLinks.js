import React from "react";
import ReactTooltip from "react-tooltip";
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
      <div
        data-tip={"Manage Election"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/election") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/election"}>
          <img
            src={election}
            alt={"Manage Election"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"Manage Political Parties"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/party") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/party"}>
          <img
            src={parties}
            alt={"Manage Political Parties"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"View Voters"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/voters") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/voters"}>
          <img src={voter} alt={"View Voters"} className={"sidebarIcon"} />
        </Link>
      </div>
      <div
        data-tip={"Manage Candidates"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/candidates") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/candidates"}>
          <img
            src={candidates}
            alt={"Manage Candidates"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"Manage Electoral Officials"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/officials") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/officials"}>
          <img
            src={official}
            alt={"Mange Officials"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"Manage Polling Officers"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/officers") ? " selected" : ""
        }`}
      >
        <Link to={"/dashboard/officers"}>
          <img
            src={officer}
            alt={"Manage Polling Officers"}
            className={"sidebarIcon"}
          />
        </Link>
      </div>
      <div
        data-tip={"Manage Registration Pins"}
        className={`sidebar-item${
          contains(props.location, "/dashboard/pins") ? "selected" : ""
        }`}
      >
        <Link to={"/dashboard/pins"}>
          <img
            src={registrationPin}
            alt={"Manage Registration Pins"}
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

export default OfficialLinks;
