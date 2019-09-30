import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import SweetAlert from "react-bootstrap-sweetalert";

import "./election.sass";
import "routes/dashboard-election/dashboard-election-home/election.sass";
import BaseCard from "components/cards/base-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import warningIcon from "assets/img/icons/warning.png";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import election from "assets/img/icons/election.png";
import LinkButton from "components/buttons/react-router-link-button";
import { capitalize } from "utils/helpers";

function ElectionHomeRouteView(props) {
  const userManager = props.userManager;
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.election === null ? (
    <Row id={"electionHome"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | No Configured Election</title>
      </Helmet>
      <Col md={{ span: 10, offset: 1 }}>
        <BaseCard id={"nullCard"}>
          <div className="clearfix">
            <div className="float-left iconContainer">
              <img src={warningIcon} alt={"Warning: No Election Configured"} />
            </div>
            <div className="float-left">
              <h4 className={"nullCardTitle"}>
                No Election has been configured
              </h4>
              {userManager.isOfficial() ? (
                <p className={"mt-4"}>
                  In order to use this section you have to create and configure
                  an election.
                </p>
              ) : (
                <p className={"mt-4"}>
                  You will be notified when an election has been created.
                </p>
              )}

              <ul className={"no-style m-0 p-0 h-menu"}>
                {userManager.isOfficial() ? (
                  <li>
                    <Link
                      id={"create-election-button"}
                      to={`${props.match.path}/create`}
                    >
                      Create
                    </Link>
                  </li>
                ) : (
                  <li>
                    <LinkButton
                      id={"create-election-button"}
                      className={"confirm-background"}
                      to={`/dashboard/`}
                    >
                      <i className="fas fa-chevron-left" />
                      Back to Home
                    </LinkButton>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </BaseCard>
      </Col>
    </Row>
  ) : (
    <Row id={"electionHome"}>
      <Helmet>
        <title>
          {process.env.REACT_APP_NAME} |
          {props.user.roles.includes("official") ? " Manage" : " View"} Election
        </title>
      </Helmet>
      <Col md={11}>
        <BaseCard id={"manageElection"} className={"poppins"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={election}
                alt="Manage Election"
                className={"title-icon"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>
                {props.user.roles.includes("official") ? "Manage" : "View"}{" "}
                Election
              </p>
            </div>
          </div>
          <p className={"subtitle mt-2"}>
            In this section you can{" "}
            {props.user.roles.includes("official") ? "manage" : "view"} the
            details of the current election
          </p>
          <div className={"detail mt-4"}>
            <p className="detailTitle">Election Name:</p>
            <p>{props.election.name}</p>
          </div>
          <div className={"detail"}>
            <p className="detailTitle">Start Date:</p>
            <p>{props.string_dates.start_date}</p>
          </div>
          <div className={"detail"}>
            <p className="detailTitle">End Date:</p>
            <p>{props.string_dates.end_date}</p>
          </div>
          <div className={"detail"}>
            <p className="detailTitle">Status:</p>
            <p>{capitalize(props.election.status)}</p>
          </div>
          {props.user.roles.includes("official") && (
            <div className={"detail mb-4"}>
              <p className="detailTitle">Created By:</p>
              <p>
                {props.created_by.name}
                <span className={"email"}>
                  {" "}
                  &lt;{props.created_by.email}&gt;
                </span>
              </p>
            </div>
          )}
          <div className={"mt-4"} />
          <ul
            className={"no-style m-0 mt-4 o-auto fullWidth clearfix p-0 h-menu"}
          >
            {props.user.roles.includes("official") ? (
              <>
                {props.election.status === "completed" ? (
                  <li className={"mr-3 float-left"}>
                    <LinkButton
                      className={"logo-background"}
                      onClick={e => props.showFinalizeModal(e)}
                      to={"#"}
                    >
                      {props.finalizing ? (
                        <i className="fas fa-spinner fa-pulse" />
                      ) : (
                        <>
                          <i className="fas fa-check" /> Finalize
                        </>
                      )}
                    </LinkButton>
                  </li>
                ) : (
                  <li className={"mr-3 float-left"}>
                    <LinkButton
                      className={"confirm-background"}
                      to={"/dashboard/election/edit"}
                    >
                      <i className="far fa-edit" /> Edit
                    </LinkButton>
                  </li>
                )}
                <li className={"float-right"}>
                  <LinkButton
                    className={"reject-background"}
                    to={"/dashboard/election/delete"}
                    onClick={e => props.showDeleteModal(e)}
                  >
                    <i className="far fa-trash-alt" />
                    Delete
                  </LinkButton>
                </li>
              </>
            ) : (
              <li className={"mr-3 float-left"}>
                <LinkButton className={"confirm-background"} to={"/dashboard"}>
                  <i className="fas fa-chevron-left" /> Back to home
                </LinkButton>
              </li>
            )}
          </ul>
          {userManager.isOfficial() && props.fireDeleteModal && (
            <SweetAlert
              warning={!props.electionIsDeleting}
              custom={props.electionIsDeleting}
              allowEscape
              closeOnClickOutside={!props.electionIsDeleting}
              showCancel={!props.electionIsDeleting}
              showConfirm={!props.electionIsDeleting}
              confirmBtnText={`${
                props.electionIsDeleting ? "" : "Yes, delete it!"
              }`}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={`${props.electionIsDeleting ? "" : "Are you sure?"}`}
              onCancel={props.closeDeleteModal}
              onConfirm={props.deleteElection}
            >
              {props.electionIsDeleting ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                `This action will delete this election and all its candidates. It
							cannot be undone.`
              )}
            </SweetAlert>
          )}
          {userManager.isOfficial() && props.fireFinalizeModal && (
            <SweetAlert
              warning={!props.finalizing}
              custom={props.finalizing}
              allowEscape
              closeOnClickOutside={!props.finalizing}
              showCancel={!props.finalizing}
              showConfirm={!props.finalizing}
              confirmBtnText={`${props.finalizing ? "" : "Yes, finalize it!"}`}
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title={`${props.finalizing ? "" : "Are you sure?"}`}
              onCancel={props.closeDeleteModal}
              onConfirm={props.finalizeElection}
            >
              {props.finalizing ? (
                <SubRouteLoader className={"mt-5 mb-5"} />
              ) : (
                `This action will finalize the election. This means it's results and data will no longer be publicly visible. This action cannot be undone.`
              )}
            </SweetAlert>
          )}
          {userManager.isOfficial() && props.fireDeleteSuccessModal && (
            <SweetAlert
              success
              allowEscape
              closeOnClickOutside
              title="Success!"
              onConfirm={props.handleModalConfirmation}
              cancelBtnBsStyle="default"
            >
              Election deleted successfully
            </SweetAlert>
          )}
          {userManager.isOfficial() && props.fireFinalizeSuccessModal && (
            <SweetAlert
              success
              allowEscape
              closeOnClickOutside
              title="Success!"
              onConfirm={props.handleModalConfirmation}
              cancelBtnBsStyle="default"
            >
              Election finalized successfully
            </SweetAlert>
          )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default ElectionHomeRouteView;
