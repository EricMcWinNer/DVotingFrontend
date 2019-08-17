import React from "react";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import deleteIcon from "assets/img/icons/delete.png";
import brokenLink from "assets/img/icons/broken-link.png";
import { Link } from "react-router-dom";

function DashboardPartyDeleteRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
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
              <p className={"title"}>Are you sure?</p>
            </div>
          </div>
          <p className="subtitle poppins">
            You are about to delete #partyName, this action cannot be undone.
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
  );
}

export default DashboardPartyDeleteRouteView;
