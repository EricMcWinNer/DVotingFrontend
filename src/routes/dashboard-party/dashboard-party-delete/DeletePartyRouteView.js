import React from "react";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import deleteIcon from "assets/img/icons/delete.png";
import { Link } from "react-router-dom";
import BrokenLinkCard from "components/cards/broken-link-card";
import Helmet from "components/forms/election/edit/EditElectionFormView";

function DeletePartyRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.party === null ? (
    <Row id={"deleteElection"}>
      <Col md={{ span: 8, offset: 1 }}>
        <BrokenLinkCard />
      </Col>
    </Row>
  ) : (
    <Row id={"deleteElection"}>
      <Col md={{ span: 8, offset: 1 }}>
        <Helmet>
          <title>
            {process.env.REACT_APP_NAME} | Delete {props.party.acronym}
          </title>
        </Helmet>
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
            You are about to delete{" "}
            <b>
              {props.party.name} ({props.party.acronym})
            </b>
            , this action cannot be undone.
          </p>
          <ul className={"no-style m-0 p-0 h-menu"}>
            <li>
              <Link
                id={"delete-election-button"}
                className={"button"}
                onClick={e => props.handleDelete(e)}
                to={`/dashboard/party/${props.party.id}/delete`}
              >
                {props.deleting ? (
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
                to={`/dashboard/party`}
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

export default DeletePartyRouteView;
