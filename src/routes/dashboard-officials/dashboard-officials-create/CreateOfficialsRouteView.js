import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "react-helmet";
import officials from "assets/img/icons/official.png";
import DataTable from "react-data-table-component";
import { selectOfficialModel } from "utils/tablemodels";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import SweetAlert from "react-bootstrap-sweetalert";

function CreateOfficialsRouteView(props) {
  const userManager = props.componentIsLoading ? null : props.userManager;
  const selectOfficialColumns = selectOfficialModel(props.showCreateModal);
  let eligibleOfficialsData, states, lgas;
  if (!props.componentIsLoading) {
    eligibleOfficialsData = props.users.map((official, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
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
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Create Officials</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={officials}
                alt="Create Officials"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Create an Electoral Official</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can create new electoral officials. You can do
            that by either selecting an already registered user from the list
            below or generating a pin for new registers to automatically become
            electoral official.
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
              columns={selectOfficialColumns}
              data={eligibleOfficialsData}
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
                  className={"confirm-background"}
                  to={`/dashboard/pins/`}
                >
                  <i className="far fa-plus-square" />
                  Generate Pins for Officials
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && props.fireCreateModal && (
            <SweetAlert
              info={!props.officialIsLoading}
              custom={props.officialIsLoading}
              allowEscape
              closeOnClickOutside={!props.officialIsLoading}
              showCancel={!props.officialIsLoading}
              showConfirm={!props.officialIsLoading}
              confirmBtnText={`${props.officialIsLoading ? "" : "Yes, do it!"}`}
              confirmBtnBsStyle="info"
              cancelBtnBsStyle="default"
              title={`${props.officialIsLoading ? "" : "Are you sure?"}`}
              onCancel={props.closeCreateModal}
              onConfirm={props.createOfficialConfirm}
            >
              {props.officialIsLoading ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                <span className="cartogothic">
                  This action will make the selected user an official.
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
              <span className="cartogothic">Official created successfully</span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default CreateOfficialsRouteView;
