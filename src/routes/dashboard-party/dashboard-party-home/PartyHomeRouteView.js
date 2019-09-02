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
import Helmet from "react-helmet";
import SweetAlert from "react-bootstrap-sweetalert";

function PartyHomeRouteView(props) {
  const userManager = props.componentIsLoading ? null : props.userManager;
  const partiesModel = politicalPartiesModel(props.showDeleteModal);
  const handleKeyUp = e => {
    if (e.keyCode === 13)
      props.getSearchResults(props.searchNeedle.current.value);
  };
  let partiesData;
  if (!props.componentIsLoading) {
    partiesData = props.parties.map((datum, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      ...datum,
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
          <div className={"searchTools"}>
            <ul className={"o-auto clearfix"}>
              <li className="float-right">
                <label htmlFor={"searchNeedle"}>Search:</label>
                <input
                  type={"search"}
                  name={"searchNeedle"}
                  id={"searchNeedle"}
                  ref={props.searchNeedle}
                  className={"searchParty"}
                  onKeyUp={e => handleKeyUp(e)}
                  placeholder={"Search for a party"}
                />
                <button
                  className="closeSearch"
                  onClick={e => props.clearSearch(e)}
                >
                  &times;
                </button>
              </li>
            </ul>
          </div>
          <div className={"DataTableContainer"}>
            <DataTable
              noHeader
              striped
              columns={partiesModel}
              data={partiesData}
              pagination
              paginationServer
              paginationTotalRows={props.totalResults}
              onChangePage={page => props.changePage(page)}
              onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
                props.changeRowsPerPage(currentRowsPerPage, currentPage)
              }
              paginationPerPage={20}
            />
            {props.tableLoading && (
              <div className="DataTableLoader">
                <SubRouteLoader />
              </div>
            )}
          </div>
          <ul className={"no-style mt-5 mx-0 p-0 h-menu"}>
            {props.user.roles.includes("official") && (
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"cool-purple-background"}
                  to={`/dashboard/party/create`}
                >
                  <i className="far fa-plus-square" />
                  Create new party
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && props.fireDeleteModal && (
            <SweetAlert
              warning={!props.partyIsDeleting}
              custom={props.partyIsDeleting}
              allowEscape
              closeOnClickOutside={!props.partyIsDeleting}
              showCancel={!props.partyIsDeleting}
              showConfirm={!props.partyIsDeleting}
              confirmBtnText={`${
                props.partyIsDeleting ? "" : "Yes, delete it!"
              }`}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={`${props.partyIsDeleting ? "" : "Are you sure?"}`}
              onCancel={props.closeDeleteModal}
              onConfirm={props.deletePartyConfirm}
            >
              {props.partyIsDeleting ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                <span className="cartogothic">
                  This action will delete the selected party and all its
                  candidates. It cannot be undone.
                </span>
              )}
            </SweetAlert>
          )}
          {userManager.isOfficial() && props.fireDeleteSuccessModal && (
            <SweetAlert
              success
              allowEscape
              closeOnClickOutside
              title="Success?"
              onConfirm={props.handleModalConfirmation}
            >
              <span className="cartogothic">Election deleted successfully</span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default PartyHomeRouteView;
