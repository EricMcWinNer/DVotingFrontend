import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import BrokenLink from "components/cards/broken-link-card";
import BaseCard from "components/cards/base-card/";
import voter from "assets/img/icons/voter.png";
import PureTable from "components/dashboard/pure-table";
import { viewVotersOfficialModel } from "utils/tablemodels";

function ViewVotersRegisteredRouteView(props) {
  const userManager = props.userManager;
  const handleKeyUp = e => {
    if (e.keyCode === 13)
      props.getSearchResults(props.searchNeedle.current.value);
  };
  let voterData;
  if (!props.componentIsLoading) {
    voterData = props.voters.map((voter, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      ...voter,
    }));
  }
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.officer === null ? (
    <BrokenLink />
  ) : (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard className="officer">
          <Helmet>
            <title>
              {process.env.REACT_APP_NAME} | View voters registered by{" "}
              {props.officer.name}
            </title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={voter}
                alt="View Registered Voters"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>
                Voters Registered by {props.officer.name}
              </p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and edit the information of all the
            voters registered by {props.officer.name}.
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto fullWidth clearfix"}>
              <li className="float-right">
                <label htmlFor={"searchNeedle"}>Search by name:</label>
                <input
                  type={"search"}
                  name={"searchNeedle"}
                  id={"searchNeedle"}
                  ref={props.searchNeedle}
                  className={"searchCandidate"}
                  onKeyUp={e => handleKeyUp(e)}
                  placeholder={"Search for a voter by name"}
                />
                <button
                  className="closeSearch"
                  onClick={e => props.clearSearch(e)}
                >
                  &times;
                </button>
              </li>
            </ul>
            <div className={"DataTableContainer mt-3"}>
              <PureTable
                noHeader
                striped
                columns={viewVotersOfficialModel}
                data={voterData}
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
          </div>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default ViewVotersRegisteredRouteView;
