import React from "react";
import { contains } from "utils/helpers";
import { Link } from "react-router-dom";
import register from "assets/img/icons/register.png";

function OfficialLinks(props) {
  return (
    <>
      <li
        className={
          contains(props.location, "/dashboard/officers/voters/new")
            ? "selected"
            : ""
        }
      >
        <Link to={"/dashboard/officers/voters/new"}>
          <img
            src={register}
            alt={"Register New Voter"}
            className={"sidebarIcon"}
          />
          Register New voter
        </Link>
      </li>
    </>
  );
}

export default OfficialLinks;
