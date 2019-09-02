import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import officials from "assets/img/icons/official.png";
import { pinModel } from "utils/tablemodels";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

import "./index.sass";

function PinsHomeRouteView(props) {
  let pinData;
  const userManager = props.userManager;
  if (!props.componentIsLoading)
    pinData = props.pins.map((pin, index) => ({
      serial: (props.currentPage - 1) * props.perPage + (index + 1),
      ...pin,
    }));
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>
              {process.env.REACT_APP_NAME} | Manage Regiatration Pins
            </title>
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
              <p className={"title"}>Registration Pins</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and manage all the registration pins
            used by electoral officials and polling officers to register on the
            application.
          </p>
          <div className={"searchTools"}>
            <ul className={"o-auto fullWidth clearfix"}>
              <li>
                <LinkButton
                  id={"manage-election-button"}
                  className={"logo-background mt-3"}
                  to={`/dashboard/pins/create`}
                >
                  <i className="fas fa-plus-circle" />
                  Create new Pins
                </LinkButton>
              </li>
              <li className={"float-right"}>
                <ul className={"o-auto clearfix"}>
                  <li className={""}>
                    <label htmlFor={"filterByStatus"}>Filter by status:</label>
                    <select
                      name={"filterByStatus"}
                      id={"filterByStatus"}
                      className={"filterPins custom-select"}
                      value={props.status}
                      onChange={e => props.handleFilterSelect(e)}
                    >
                      <option value={"unused"}>Unused</option>
                      <option value={"used"}>Used</option>
                    </select>
                  </li>
                  <li className={"ml-2"}>
                    <label htmlFor={"filterByType"}>Filter by User Type:</label>
                    <select
                      name={"filterByType"}
                      id={"filterByType"}
                      className={"filterPins custom-select"}
                      value={props.type}
                      onChange={e => props.handleFilterSelect(e)}
                    >
                      <option value={""}>None</option>
                      <option value={"official"}>Electoral Official</option>
                      <option value={"officer"}>Polling Officer</option>
                    </select>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={"DataTableContainer"}>
            <DataTable
              noHeader
              striped
              columns={pinModel}
              data={pinData}
              paginationServer
              pagination
              paginationTotalRows={props.totalResults}
              onChangePage={page => props.changePage(page)}
              onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
                props.changeRowsPerPage(currentRowsPerPage, currentPage)
              }
              rowsPerPage={[10, 20, 50, 100, 500]}
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

export default PinsHomeRouteView;
