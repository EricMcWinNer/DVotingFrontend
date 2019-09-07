import React from "react";
import { contains } from "utils/helpers";
import { Link } from "react-router-dom";
import register from "assets/img/icons/register.png";

function OfficialLinks(props) {
  return (
    <>
      <li
        className={
          contains(props.location, "/dashboard/officer/register")
            ? "selected"
            : ""
        }
      >
        <Link to={"/dashboard/officer/register/voter"}>
          <img
            src={register}
            alt={"Register New Voter"}
            className={"sidebarIcon"}
          />
          Register New voter
        </Link>
      </li>
      <li
        className={
          contains(props.location, "/dashboard/officer/voters")
            ? "selected"
            : ""
        }
      >
        <Link to={"/dashboard/officer/voters"}>
          <img
            src={register}
            alt={"View Registered Voters"}
            className={"sidebarIcon"}
          />
          View Registered Voters
        </Link>
      </li>
    </>
  );
}

export default OfficialLinks;
