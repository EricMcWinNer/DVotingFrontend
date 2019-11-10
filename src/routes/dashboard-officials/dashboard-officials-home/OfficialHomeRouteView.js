import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "react-helmet";
import officials from "assets/img/icons/official.png";
import { officialModel } from "utils/tablemodels";
import PureTable from "components/dashboard/pure-table";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import SweetAlert from "react-bootstrap-sweetalert";
import PureSelect from "components/dashboard/pure-select";

function OfficialHomeRouteView(props) {
  let officialData, states, lgas;
  const userManager = props.componentIsLoading ? null : props.userManager;
  const officialColumns = officialModel(props.showDeleteModal);
  if (!props.componentIsLoading) {
    officialData = props.officials.map((official, index) => ({
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
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Manage Officials</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={officials}
                alt="Manage Officials"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Electoral Officials</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and manage all the officials registered
            in the application
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto fullWidth clearfix"}>
              <li>
                <label htmlFor={"filterState"}>Filter by state:</label>
                <PureSelect
                  name={"filterState"}
                  id={"filterState"}
                  className={"filterVoters custom-select"}
                  value={props.selectedState}
                  onChange={e => props.handleFilterSelect(e)}
                  firstOption={<option value={""}>None</option>}
                >
                  {states}
                </PureSelect>
              </li>
              <li>
                <label htmlFor={"filterLGA"}>Filter by LGA:</label>
                <PureSelect
                  name={"filterLGA"}
                  id={"filterLGA"}
                  className={"filterVoters custom-select"}
                  value={props.selectedLga}
                  onChange={e => props.handleFilterSelect(e)}
                  firstOption={<option value={""}>None</option>}
                >
                  {lgas}
                </PureSelect>
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
                  placeholder={"Search for an electoral official"}
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
            <PureTable
              noHeader
              striped
              columns={officialColumns}
              data={officialData}
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
            {props.user.roles.includes("official") && (
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"cool-purple-background"}
                  to={`/dashboard/officials/create`}
                >
                  <i className="far fa-plus-square" />
                  Create new Official
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && props.fireDeleteModal && (
            <SweetAlert
              warning={!props.officialIsLoading}
              custom={props.officialIsLoading}
              allowEscape
              closeOnClickOutside={!props.officialIsLoading}
              showCancel={!props.officialIsLoading}
              showConfirm={!props.officialIsLoading}
              confirmBtnText={`${props.officialIsLoading ? "" : "Yes, do it!"}`}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={`${props.officialIsLoading ? "" : "Are you sure?"}`}
              onCancel={props.closeDeleteModal}
              onConfirm={props.deleteOfficialConfirm}
            >
              {props.officialIsLoading ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                <span className="cartogothic">
                  {props.official.id === userManager.returnUser().id
                    ? "This action will stop you from being an electoral official."
                    : "This action will delete the selected electoral official."}
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
              <span className="cartogothic">
                {props.official.id === userManager.returnUser().id
                  ? "You have successfully been removed from the electoral official list"  
                  : "The electoral official deleted successfully"}
              </span>
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default OfficialHomeRouteView;
