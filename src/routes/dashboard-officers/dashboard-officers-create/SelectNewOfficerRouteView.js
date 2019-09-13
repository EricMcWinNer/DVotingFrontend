import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import BaseCard from "components/cards/base-card";
import officer from "assets/img/icons/officer.png";
import { selectOfficerModel } from "utils/tablemodels";
import LinkButton from "components/buttons/react-router-link-button";
import SweetAlert from "react-bootstrap-sweetalert";

function SelectNewOfficerRouteView(props) {
  const userManager = props.userManager;
  const selectOfficerColumns = selectOfficerModel(props.showCreateModal);
  let eligibleOfficersData, states, lgas;
  if (!props.componentIsLoading) {
    eligibleOfficersData = props.eligibleOfficers.map((official, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      reversedRoles: JSON.parse(official.roles).reverse(),
      ...official,
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
              <p className={"title"}>Select New Polling Officers</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can select a new polling officer. A list of all
            the registered voters who have not been assigned other roles is
            available below for you to choose from. You could also generate
            officer registration pins using the button below.
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
                  placeholder={"Search for a candidate"}
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
              columns={selectOfficerColumns}
              data={eligibleOfficersData}
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
          <ul
            className={
              "no-style mt-5 mx-0 fullWidth p-0 clearfloat o-auto h-menu"
            }
          >
            <li className={"float-left"}>
              <LinkButton
                id={"manage-election-button"}
                className={"confirm-background"}
                to={`/dashboard/pins`}
              >
                <i className="fas fa-angle-left" />
                Generate officer pins
              </LinkButton>
            </li>

            <li className={"float-right"}>
              <LinkButton
                id={"manage-election-button"}
                className={"cool-purple-background"}
                to={`/dashboard/officers`}
              >
                <i className="fas fa-angle-left" />
                Back to Officers
              </LinkButton>
            </li>
          </ul>
          {userManager.isOfficial() && props.fireCreateModal && (
            <SweetAlert
              info={!props.officerIsLoading}
              custom={props.officerIsLoading}
              allowEscape
              closeOnClickOutside={!props.officerIsLoading}
              showCancel={!props.officerIsLoading}
              showConfirm={!props.officerIsLoading}
              confirmBtnText={`${props.officerIsLoading ? "" : "Yes, do it!"}`}
              confirmBtnBsStyle="info"
              cancelBtnBsStyle="default"
              title={`${props.officerIsLoading ? "" : "Are you sure?"}`}
              onCancel={props.closeCreateModal}
              onConfirm={props.handleModalConfirmation}
            >
              {props.officerIsLoading ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                <span className="cartogothic">
                  This action will make the selected user an officer.
                </span>
              )}
            </SweetAlert>
          )}
          {userManager.isOfficial() && props.fireCreateSuccessModal && (
            <SweetAlert
              success
              allowEscape
              closeOnClickOutside
              title="Success!"
              onConfirm={props.handleModalConfirmation}
              onCancel={props.handleModalConfirmation}
            >
              <span className="cartogothic">Officer created successfully</span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default SelectNewOfficerRouteView;
