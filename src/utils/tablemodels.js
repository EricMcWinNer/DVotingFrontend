import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import React from "react";

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
