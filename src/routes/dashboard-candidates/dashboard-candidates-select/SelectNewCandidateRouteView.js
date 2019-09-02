import React from "react";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route/";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import Helmet from "react-helmet";
import candidates from "assets/img/icons/totalcandidates.png";
import DataTable from "react-data-table-component";
import { selectCandidatesModel } from "utils/tablemodels";

function SelectNewCandidateRouteView(props) {
  const handleKeyUp = e => {
    if (e.keyCode === 13)
      props.getSearchResults(props.searchNeedle.current.value);
  };
  let userData, states, lgas;
  if (!props.componentIsLoading) {
    userData = props.users.map((voter, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      reversedRoles: JSON.parse(voter.roles).reverse(),
      ...voter,
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
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <Row id={"voters"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | Select new candidate</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={candidates}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Select a new Candidate</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can select a new candidate from a list of all
            the users who are not candidates yet.
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto clearfix"}>
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
                  className={"searchVoter"}
                  onKeyUp={e => handleKeyUp(e)}
                  placeholder={"Search for a voter"}
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
              columns={selectCandidatesModel}
              data={userData}
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
        </BaseCard>
      </Col>
    </Row>
  );
}

export default SelectNewCandidateRouteView;
