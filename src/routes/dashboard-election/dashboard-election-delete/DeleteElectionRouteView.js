import React from "react";
import { Link } from "react-router-dom";

import "./index.sass";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import BaseCard from "components/cards/base-card";
import warningIcon from "assets/img/icons/warning.png";
import deleteIcon from "assets/img/icons/delete.png";

function DeleteElectionRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.election !== null ? (
    <Row id={"deleteElection"}>
      <Col md={{ span: 8, offset: 1 }}>
        <BaseCard>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={deleteIcon}
                alt="Delete Election"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Delete Election</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Are you sure you want to delete the current election?
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <Link
                id={"delete-election-button"}
                className={"button"}
                onClick={e => props.deleteElection(e)}
                to={`/dashboard/election/delete`}
              >
                {props.formIsSubmitting ? (
                  <i className="fas fa-spinner fa-pulse" />
                ) : (
                  "Yes"
                )}
              </Link>
            </li>
            <li>
              <Link
                id={"dontdelete-election-button"}
                className={"button"}
                to={`/dashboard/election`}
              >
                No
              </Link>
            </li>
          </ul>
        </BaseCard>
      </Col>
    </Row>
  ) : (
    <BaseCard id={"nullCard"}>
      <div className="clearfix poppins">
        <div className="float-left mr-4 iconContainer">
          <img src={warningIcon} alt={"Warning: No Election Configured"} />
        </div>
        <div className="float-left">
          <h4 className={"nullCardTitle"}>No Election has been configured</h4>
          <p className={"mt-4"}>
            In order to use this section you have to create and configure an
            election.
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <Link
                id={"delete-election-button"}
                to={`${props.match.path}/create`}
                className={"button"}
              >
                Create
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </BaseCard>
  );
}

export default DeleteElectionRouteView;
