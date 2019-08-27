import React from "react";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import IconBadge from "components/badges/icon-badge";
import { capitalize } from "utils/helpers";

export const politicalPartiesModel = [
  {
    name: "S/N",
    selector: "serial",
    sortable: true,
    maxWidth: "30px"
  },
  {
    name: "Actions",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          small
          to={`/dashboard/party/${row.id}/edit`}
          className={"confirm-background mr-2"}
        >
          <i className="fas fa-pencil-ruler" />
          Edit
        </LinkButton>
        <LinkButton
          small
          to={`/dashboard/party/${row.id}/delete`}
          className={"reject-background"}
        >
          <i className="far fa-trash-alt" />
          Delete
        </LinkButton>
      </>
    ),
    maxWidth: "200px"
  },
  {
    name: "Logo",
    sortable: false,
    cell: row => (
      <img
        className={"party-logo"}
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.logo}`}
        alt={row.name}
      />
    ),
    maxWidth: "45px"
  },
  {
    name: "Acronym",
    selector: "acronym",
    sortable: true,
    maxWidth: "45px"
  },
  {
    name: "Name",
    selector: "name",
    sortable: true
  }
];

export const votersModel = [
  {
    name: "S/N",
    selector: "serial",
    sortable: true,
    maxWidth: "22px"
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <LinkButton
        small
        className={"confirm-background mr-2"}
        to={`/dashboard/voters/${row.id}`}
      >
        <i className="fas fa-info-circle" />
        Full info
      </LinkButton>
    ),
    minWidth: "130px"
  },
  {
    name: "Picture",
    sortable: false,
    cell: row => (
      <img
        className={"profile-picture"}
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.picture}`}
        alt={row.name}
      />
    ),
    maxWidth: "45px"
  },
  {
    name: "Full Name",
    selector: "name",
    sortable: true,
    minWidth: "255px"
  },
  {
    name: "Email address",
    selector: "email",
    sortable: true,
    minWidth: "255px"
  },
  {
    name: "Roles",
    sortable: false,
    cell: row => {
      return row.reversedRoles.map((role, index) => (
        <IconBadge className={`${role}`} key={index + 1}>
          {role === "voter" && <i className="fas fa-person-booth" />}
          {role === "official" && <i className="fas fa-users-cog" />}
          {role === "candidate" && <i className="fas fa-user-tie" />}
          {capitalize(role)}
        </IconBadge>
      ));
    },
    minWidth: "200px"
  },
  {
    name: "Gender",
    sortable: true,
    cell: row => (
      <IconBadge className={row.gender} fixedWidth={70}>
        {row.gender === "male" && <i className="fas fa-male" />}
        {row.gender === "female" && <i className="fas fa-female" />}
        {capitalize(row.gender)}
      </IconBadge>
    ),
    maxWidth: "80px"
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    maxWidth: "220px"
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    maxWidth: "30px"
  },
  {
    name: "Phone Number",
    sortable: true,
    selector: "phone_number"
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name"
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name"
  },
  {
    name: "Address 1",
    sortable: true,
    selector: "address1",
    minWidth: "300px"
  },
  {
    name: "Address 2",
    sortable: true,
    selector: "address2",
    minWidth: "300px"
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    )
  },
  {
    name: "Occupation",
    sortable: true,
    selector: "occupation"
  }
];

export const candidatesModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
    maxWidth: "10px"
  },
  {
    //TODO -SORT OUT TOOLTIP
    name: "Actions",
    sortable: false,
    cell: row => (
      <>
        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-info`}>
              View the full information of the candidate
            </Tooltip>
          }
        >
          <LinkButton
            small
            className={"confirm-background center only-icon text-center mr-2"}
            to={`/dashboard/voters/${row.user_id}`}
          >
            <i className="fas fa-info-circle" />
          </LinkButton>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          trigger={"hover"}
          overlay={
            <Tooltip id={`tooltip-edit`}>
              Edit the candidate's information
            </Tooltip>
          }
        >
          <LinkButton
            small
            className={"logo-background only-icon text-center mr-2"}
            to={`/dashboard/candidates/${row.id}/edit`}
          >
            <i className="fas fa-user-edit" />
          </LinkButton>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip-delete`}>
              <b>Delete</b> this candidate
            </Tooltip>
          }
        >
          <LinkButton
            small
            className={"reject-background only-icon text-center mr-2"}
            to={`/dashboard/candidates/${row.id}/delete`}
          >
            <i className="fas fa-trash-alt" />
          </LinkButton>
        </OverlayTrigger>
      </>
    ),
    minWidth: "200px"
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <img
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.candidate_picture}`}
        alt={row.name}
        height={"45px"}
      />
    ),
    maxWidth: "55px"
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "250px"
  },
  {
    name: "Position",
    sortable: false,
    cell: row => (
      <IconBadge className={row.role} fixedWidth={70}>
        {capitalize(row.role)}
      </IconBadge>
    ),
    minWidth: "160px"
  },
  {
    name: "Party Logo",
    sortable: false,
    cell: row => (
      <img
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.party.logo}`}
        alt={row.party.name}
        height={"45px"}
        style={{ borderRadius: "50%" }}
      />
    )
  },
  {
    name: "Political Party",
    sortable: true,
    selector: "party_name",
    minWidth: "300px"
  }
];

export const selectCandidatesModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial"
  },
  {
    //todo - Change Icon to a proper one
    name: "",
    sortable: false,
    cell: row => (
      <LinkButton
        small
        className={"confirm-background mr-2"}
        to={`/dashboard/candidates/${row.id}/create`}
      >
        <i className="fas fa-info-circle" />
        Make Candidate
      </LinkButton>
    ),
    minWidth: "130px"
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <img
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.picture}`}
        alt={row.name}
        height={"45px"}
      />
    ),
    maxWidth: "55px"
  },
  {
    name: "Name",
    sortable: true,
    selector: "name"
  },
  {
    name: "Gender",
    sortable: true,
    cell: row => (
      <IconBadge className={row.gender} fixedWidth={70}>
        {row.gender === "male" && <i className="fas fa-male" />}
        {row.gender === "female" && <i className="fas fa-female" />}
        {capitalize(row.gender)}
      </IconBadge>
    ),
    maxWidth: "80px"
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    maxWidth: "30px"
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    maxWidth: "220px"
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    )
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name"
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name"
  }
];

export const officialModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial"
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          small
          className={"confirm-background mr-2"}
          to={`/dashboard/voters/${row.id}`}
        >
          <i className="fas fa-info-circle" />
          Full info
        </LinkButton>
        <LinkButton
          small
          className={"reject-background mr-2"}
          to={`/dashboard/officials/${row.id}/delete`}
        >
          <i className="fas fa-trash-alt" />
          Delete
        </LinkButton>
      </>
    ),
    minWidth: "200px"
  },
  {
    name: "Picture",
    sortable: false,
    cell: row => (
      <img
        className={"profile-picture"}
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.picture}`}
        alt={row.name}
      />
    ),
    maxWidth: "45px"
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "250px"
  },
  {
    name: "Phone Number",
    sortable: true,
    selector: "phone_number",
    minWidth: "200px"
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name"
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name"
  }
];
