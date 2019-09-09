import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

import SubRouteLoader from "components/loaders/dashboard-sub-route";
import BaseCard from "components/cards/base-card";
import "./index.sass";
import officer from "assets/img/icons/officer.png";
import { officerModel } from "utils/tablemodels";
import LinkButton from "components/buttons/react-router-link-button";
import SweetAlert from "react-bootstrap-sweetalert";

function OfficerHomeRouteView(props) {
  const userManager = props.userManager;
  let officerData, states, lgas;
  const officerColumns = officerModel(props.showDeleteModal);
  if (!props.componentIsLoading) {
    officerData = props.officers.map((officer, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      reversedRoles: JSON.parse(officer.roles).reverse(),
      ...officer,
    }));
    states = props.states.map((state, index) => (
      <option value={state.state_id} key={index}>
        {state.name}
      </option>
    ));
    lgas = props.lgas.map((lga, index) => (
      <option value={lga.lga_id} key={index}>
        {lga.name} - {lga.state.name}
      </option>
    ));
  }
  const handleKeyUp = e => {
    if (e.keyCode === 13)
      props.getSearchResults(props.searchNeedle.current.value);
  };
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard className="officer">
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Manage Officers</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={officer}
                alt="Manage Officials"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Polling Officers</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and manage all the polling officers
            registered in the application
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto fullWidth clearfix"}>
              <li>
                <label htmlFor={"filterState"}>Filter by state:</label>
                <select
                  name={"filterState"}
                  id={"filterState"}
                  className={"filterVoters custom-select"}
                  value={props.selectedState}
                  onChange={e => props.handleFilterSelect(e)}
                >
                  <option value={""}>None</option>
                  {states}
                </select>
              </li>
              <li>
                <label htmlFor={"filterLGA"}>Filter by LGA:</label>
                <select
                  name={"filterLGA"}
                  id={"filterLGA"}
                  className={"filterVoters custom-select"}
                  value={props.selectedLga}
                  onChange={e => props.handleFilterSelect(e)}
                >
                  <option value={""}>None</option>
                  {lgas}
                </select>
              </li>
              <li className="float-right">
                <label htmlFor={"searchNeedle"}>Search:</label>
                <input
                  type={"search"}
                  name={"searchNeedle"}
                  id={"searchNeedle"}
                  ref={props.searchNeedle}
                  className={"searchCandidate"}
                  onKeyUp={e => handleKeyUp(e)}
                  placeholder={"Search for a polling officer"}
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
              columns={officerColumns}
              data={officerData}
              paginationServer
              pagination
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
            {userManager.isOfficial() && (
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"cool-purple-background"}
                  to={`/dashboard/officers/create`}
                >
                  <i className="far fa-plus-square" />
                  Create new Officer
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && props.fireDeleteModal && (
            <SweetAlert
              warning={!props.officerIsLoading}
              custom={props.officerIsLoading}
              allowEscape
              closeOnClickOutside={!props.officerIsLoading}
              showCancel={!props.officerIsLoading}
              showConfirm={!props.officerIsLoading}
              confirmBtnText={`${props.officerIsLoading ? "" : "Yes, do it!"}`}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={`${props.officerIsLoading ? "" : "Are you sure?"}`}
              onCancel={props.closeDeleteModal}
              onConfirm={props.deleteOfficerConfirm}
            >
              {props.officerIsLoading ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                <span className="cartogothic">
                  This action will delete the selected officer.
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
              <span className="cartogothic">Officer deleted successfully</span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default OfficerHomeRouteView;
