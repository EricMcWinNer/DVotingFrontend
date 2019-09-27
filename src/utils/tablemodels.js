import React from "react";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import ReactTooltip from "react-tooltip";
import ProgressBar from "components/progress-bar";
import IconBadge from "components/badges/icon-badge";
import { capitalize } from "utils/helpers";

export const politicalPartiesModel = modalFunction => [
  {
    name: "S/N",
    selector: "serial",
    sortable: true,
    maxWidth: "30px",
  },
  {
    name: "Actions",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          data-tip={"Edit this political party"}
          small
          to={`/dashboard/party/${row.id}/edit`}
          className={"confirm-background mr-2"}
        >
          <i className="fas fa-pencil-ruler" />
        </LinkButton>
        <LinkButton
          data-tip={"Delete this political party"}
          small
          to={`/dashboard/party/${row.id}/delete`}
          onClick={e => modalFunction(e, row.id)}
          className={"reject-background"}
        >
          <i className="far fa-trash-alt" />
        </LinkButton>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </>
    ),
    maxWidth: "110px",
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
    maxWidth: "45px",
  },
  {
    name: "Acronym",
    selector: "acronym",
    sortable: true,
    maxWidth: "45px",
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
];

export const votersModel = [
  {
    name: "S/N",
    selector: "serial",
    sortable: true,
    maxWidth: "22px",
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
    minWidth: "130px",
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
    maxWidth: "45px",
  },
  {
    name: "Full Name",
    selector: "name",
    sortable: true,
    minWidth: "255px",
  },
  {
    name: "Email address",
    selector: "email",
    sortable: true,
    minWidth: "255px",
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
          {role === "officer" && <i className="fas fa-user-alt" />}
          {capitalize(role)}
        </IconBadge>
      ));
    },
    minWidth: "200px",
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
    maxWidth: "80px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    maxWidth: "220px",
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    maxWidth: "30px",
  },
  {
    name: "Phone Number",
    sortable: true,
    selector: "phone_number",
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
  {
    name: "Address 1",
    sortable: true,
    selector: "address1",
    minWidth: "300px",
  },
  {
    name: "Address 2",
    sortable: true,
    selector: "address2",
    minWidth: "300px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
  },
  {
    name: "Occupation",
    sortable: true,
    selector: "occupation",
  },
];

export const candidatesModel = modalCallback => [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
    maxWidth: "10px",
  },
  {
    //TODO -SORT OUT TOOLTIP
    name: "Actions",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          data-tip={"View information this about candidate"}
          small
          className={"confirm-background center only-icon text-center mr-2"}
          to={`/dashboard/voters/${row.user_id}`}
        >
          <i className="fas fa-info-circle" />
        </LinkButton>

        <LinkButton
          data-tip={"Edit this candidate information"}
          small
          className={"logo-background center only-icon text-center mr-2"}
          to={`/dashboard/candidates/${row.id}/edit`}
        >
          <i className="fas fa-user-edit" />
        </LinkButton>

        <LinkButton
          data-tip={"Delete this candidate"}
          small
          className={"reject-background center only-icon text-center mr-2"}
          to={`/dashboard/candidates/${row.id}/delete`}
          onClick={e => modalCallback(e, row.id)}
        >
          <i className="fas fa-trash-alt" />
        </LinkButton>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </>
    ),
    minWidth: "110px",
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
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "250px",
  },
  {
    name: "Position",
    sortable: false,
    cell: row => (
      <IconBadge className={row.role} fixedWidth={70}>
        {capitalize(row.role)}
      </IconBadge>
    ),
    minWidth: "160px",
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
    ),
  },
  {
    name: "Political Party",
    sortable: true,
    selector: "party_name",
    minWidth: "300px",
  },
];

export const selectCandidatesModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
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
        <i className="fas fa-plus-circle" />
        Make Candidate
      </LinkButton>
    ),
    minWidth: "190px",
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
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
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
    maxWidth: "80px",
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    minWidth: "30px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    minWidth: "180px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];

export const officialModel = modalFunction => [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          data-tip={"View this electoral official's full information"}
          small
          className={"confirm-background mr-2"}
          to={`/dashboard/voters/${row.id}`}
        >
          <i className="fas fa-info-circle" />
        </LinkButton>
        <LinkButton
          data-tip={"Delete this electoral official"}
          small
          className={"reject-background mr-2"}
          to={`/dashboard/officials/${row.id}/delete`}
          onClick={e => modalFunction(e, row.id)}
        >
          <i className="fas fa-trash-alt" />
        </LinkButton>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </>
    ),
    minWidth: "110px",
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
    maxWidth: "45px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "180px",
    maxWidth: "250px",
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
          {role === "officer" && <i className="fas fa-user-alt" />}
          {capitalize(role)}
        </IconBadge>
      ));
    },
    minWidth: "200px",
  },
  {
    name: "Phone Number",
    sortable: true,
    selector: "phone_number",
    minWidth: "200px",
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
    minWidth: "120px",
    maxWidth: "200px",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];

export const selectOfficialModel = showModal => [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    //todo - Change Icon to a proper one
    name: "",
    sortable: false,
    cell: row => (
      <LinkButton
        small
        className={"cool-purple-background mr-2"}
        to={`/dashboard/officials/${row.id}/create`}
        onClick={e => showModal(e, row.id)}
      >
        <i className="fas fa-plus" />
        Make Official
      </LinkButton>
    ),
    minWidth: "190px",
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
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "180px",
    maxWidth: "250px",
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
    maxWidth: "80px",
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    minWidth: "30px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    minWidth: "180px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];

export const selectOfficerModel = showModal => [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    //todo - Change Icon to a proper one
    name: "",
    sortable: false,
    cell: row => (
      <LinkButton
        small
        className={"cool-purple-background mr-2"}
        to={`/dashboard/officers/${row.id}/create`}
        onClick={e => showModal(e, row.id)}
      >
        <i className="fas fa-plus" />
        Make Officer
      </LinkButton>
    ),
    minWidth: "190px",
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
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "180px",
    maxWidth: "250px",
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
    maxWidth: "80px",
  },
  {
    name: "Age",
    sortable: true,
    selector: "dob.age",
    minWidth: "30px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    minWidth: "180px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];
export const officerModel = showModal => [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          data-tip={"View voters registered by this officer"}
          small
          className={"cool-purple-background mr-2"}
          to={`/dashboard/officers/${row.id}/voters`}
        >
          <i className="fas fa-search" />
        </LinkButton>
        <LinkButton
          data-tip={"View this officer's full information"}
          small
          className={"confirm-background mr-2"}
          to={`/dashboard/voters/${row.id}`}
        >
          <i className="fas fa-info-circle" />
        </LinkButton>
        <LinkButton
          data-tip={"Delete this officer"}
          small
          className={"reject-background mr-2"}
          to={`/dashboard/officers/${row.id}/delete`}
          onClick={e => showModal(e, row.id)}
        >
          <i className="fas fa-trash-alt" />
        </LinkButton>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </>
    ),
    minWidth: "200px",
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
    maxWidth: "45px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "180px",
    maxWidth: "250px",
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
          {role === "officer" && <i className="fas fa-user-alt" />}
          {capitalize(role)}
        </IconBadge>
      ));
    },
    minWidth: "200px",
  },
  {
    name: "Phone Number",
    sortable: true,
    selector: "phone_number",
    minWidth: "200px",
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
    minWidth: "120px",
    maxWidth: "200px",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];
export const pinModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    name: "User Type",
    sortable: false,
    cell: row => (
      <IconBadge className={`${row.user_type}`}>
        {row.user_type === "voter" && <i className="fas fa-person-booth" />}
        {row.user_type === "official" && <i className="fas fa-users-cog" />}
        {row.user_type === "candidate" && <i className="fas fa-user-tie" />}
        {row.user_type === "officer" && <i className="fas fa-user-alt" />}
        {capitalize(row.user_type)}
      </IconBadge>
    ),
    minWidth: "100px",
  },
  {
    name: "Pin Content",
    cell: row => <b>{row.content}</b>,
  },
  {
    name: "Used By",
    cell: row =>
      row.used_by === null ? (
        <IconBadge className={`cool-purple-background`}>None</IconBadge>
      ) : (
        <LinkButton
          small
          className={"confirm-background cartogothic"}
          to={`/dashboard/voters/${row.used_by.id}`}
        >
          <i className={"fas fa-search"} />
          View User
        </LinkButton>
      ),
  },
  {
    name: "Date Used",
    cell: row => (row.date_used === null ? "n/a" : row.date_used),
  },

  {
    name: "Created By",
    cell: row => {
      const name = row.created_by.name.split(" ");
      return (
        <LinkButton
          small
          className={"confirm-background cartogothic"}
          to={`/dashboard/voters/${row.created_by.id}`}
        >
          {`${name[0]} ${name[1]}`}
        </LinkButton>
      );
    },
  },
  {
    name: "Date Created",
    selector: "created_at.created_at",
  },
];
export const viewVotersModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    name: "Actions",
    sortable: false,
    cell: row => (
      <>
        <LinkButton
          small
          className={"confirm-background mr-2"}
          to={`/dashboard/officer/voters/${row.id}`}
        >
          <i className="fas fa-info-circle" />
          Full info
        </LinkButton>
        <LinkButton
          small
          className={"cool-purple-background mr-2"}
          to={`/dashboard/officer/voters/${row.id}/edit`}
        >
          <i className="fas fa-pencil-alt" />
          Edit info
        </LinkButton>
      </>
    ),
    minWidth: "200px",
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <img
        className={"profile-picture"}
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.picture}`}
        alt={row.name}
        height={"45px"}
      />
    ),
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "210px",
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
    maxWidth: "80px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    minWidth: "140px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
    minWidth: "160px",
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];
export const viewVotersOfficialModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
  },
  {
    name: "Actions",
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
      </>
    ),
    minWidth: "120px",
  },
  {
    name: "",
    sortable: false,
    cell: row => (
      <img
        className={"profile-picture"}
        src={`${process.env.REACT_APP_API_PATH}/storage/${row.picture}`}
        alt={row.name}
        height={"45px"}
      />
    ),
    maxWidth: "55px",
  },
  {
    name: "Name",
    sortable: true,
    selector: "name",
    minWidth: "210px",
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
    maxWidth: "80px",
  },
  {
    name: "Date of Birth",
    sortable: true,
    selector: "dob.dob_string",
    minWidth: "140px",
  },
  {
    name: "Marital Status",
    sortable: true,
    cell: row => (
      <IconBadge className={row.marital_status} fixedWidth={70}>
        {capitalize(row.marital_status)}
      </IconBadge>
    ),
    minWidth: "160px",
  },
  {
    name: "LGA",
    sortable: true,
    selector: "lga.name",
  },
  {
    name: "State",
    sortable: true,
    selector: "lga.state.name",
  },
];
export const resultsModel = [
  {
    name: "S/N",
    sortable: true,
    selector: "serial",
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
    maxWidth: "45px",
  },
  {
    name: "Acronym",
    selector: "acronym",
    sortable: true,
    maxWidth: "45px",
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Number of votes",
    selector: "votes_count",
    sortable: true,
  },
  {
    name: "Percentage of votes",
    sortable: true,
    cell: row => <ProgressBar progress={row.percentage_of_votes} />,
  },
];
