import React from "react";
import Helmet from "react-helmet";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DataTable from "react-data-table-component";
import SweetAlert from "react-bootstrap-sweetalert"

import "./index.sass";
import candidates from "assets/img/icons/candidates.png";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import { candidatesModel } from "utils/tablemodels";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";


function CandidatesHomeRouteView(props) {
  const userManager = props.componentIsLoading ? null : props.userManager;
  let candidatesData;
  if (!props.componentIsLoading) {
    candidatesData = props.candidates.map((candidate, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      ...candidate
    }));
    if (!props.user.roles.includes("official")) {
      candidatesModel.splice(1, 1);
    }
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
            <title>{process.env.REACT_APP_NAME} | View Candidates</title>
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
          <ul className={"no-style mt-5 mx-0 p-0 h-menu"}>
            {props.user.roles.includes("official") && (
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"logo-background"}
                  to={`/dashboard/candidates/create`}
                >
                  <i className="far fa-plus-square" />
                  Create
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && !props.componentIsLoading && props.showNoCandidateModal && candidatesData.length === 0 && (
						<SweetAlert
							info
							allowEscape
              closeOnClickOutside
							title="No Candidates!"
              onConfirm={props.redirectToCreate}
              onCancel={props.closeNoCandidatesModal}
						>
							<span className="cartogothic">There is no candidate registered. Click the link below to create one</span>
						</SweetAlert>
					)}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default CandidatesHomeRouteView;
