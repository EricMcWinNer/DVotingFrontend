import React from "react";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import noResults from "assets/img/icons/db-error.png";
import LinkButton from "components/buttons/react-router-link-button";
import DataTable from "react-data-table-component";
import parties from "assets/img/icons/parties.png";
import { politicalPartiesModel } from "utils/tablemodels";
import Helmet from "components/forms/election/edit/EditElectionFormView";

function PartyHomeRouteView(props) {
  let partiesData;
  if (!props.componentIsLoading) {
    partiesData = props.parties.map((datum, index) => ({
      serial: index + 1,
      ...datum
    }));
    if (!props.user.roles.includes("official")) {
      politicalPartiesModel.splice(1, 1);
    }
  }
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.parties === null ? (
    <Row id={"partiesHome"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | No parties found</title>
      </Helmet>
      <Col md={{ span: 10, offset: 1 }}>
        <BaseCard id={"nullCard"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={noResults}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>No Parties Found</p>
            </div>
          </div>
          <p className="subtitle poppins">
            There are currently no parties registered in the application. Click
            the link below to create a parties.
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <LinkButton
                id={"manage-election-button"}
                className={"confirm-background"}
                to={`/dashboard/party/create`}
              >
                <i className="far fa-plus-square" />
                Create
              </LinkButton>
            </li>
          </ul>
        </BaseCard>
      </Col>
    </Row>
  ) : (
    <Row id={"partiesHome"}>
      <Col md={12}>
        <Helmet>
          <title>{process.env.REACT_APP_NAME} | Parties List</title>
        </Helmet>
        <BaseCard id={"nullCard"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={parties}
                alt="List of Political Parties"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Political Parties</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Below is a list of all political parties registered in the
            application.
            {props.user.roles.includes("official") && (
              <>You can create more parties using the link provided below.</>
            )}
          </p>
          <div className={"DataTableContainer"}>
            <DataTable
              noHeader
              striped
              columns={politicalPartiesModel}
              data={partiesData}
            />
          </div>
          <ul className={"no-style mt-5 mx-0 p-0 h-menu"}>
            {props.user.roles.includes("official") && (
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"logo-background"}
                  to={`/dashboard/party/create`}
                >
                  <i className="far fa-plus-square" />
                  Create
                </LinkButton>
              </li>
            )}
          </ul>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default PartyHomeRouteView;
