import React from "react";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
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
          {capitalize(role)}
        </IconBadge>
      ));
    },
    minWidth: "170px"
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
    selector: "age.dob_string",
    maxWidth: "220px"
  },
  {
    name: "Age",
    sortable: true,
    selector: "age.age",
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
    selector: "lga"
  },
  {
    name: "State",
    sortable: true,
    selector: "state"
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
