import React from "react";
import Helmet from "react-helmet";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DataTable from "react-data-table-component";

import "./index.sass";
import candidates from "assets/img/icons/candidates.png";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import { candidatesModel } from "utils/tablemodels";

function CandidatesHomeRouteView(props) {
  let candidatesData;
  if (!props.componentIsLoading) {
    candidatesData = props.candidates.map((candidate, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      ...candidate
    }));
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
            <title>{process.env.REACT_APP_NAME} | View Voters</title>
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
              <p className={"title"}>Candidates</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and manage all the candidates
            registered in the application
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto fullWidth clearfix"}>
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
              columns={candidatesModel}
              data={candidatesData}
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
        </BaseCard>
      </Col>
    </Row>
  );
}

export default CandidatesHomeRouteView;
