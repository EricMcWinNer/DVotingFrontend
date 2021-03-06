import React from "react";
import DateTimePicker from "react-datetime-picker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import SweetAlert from "react-bootstrap-sweetalert";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import warningIcon from "assets/img/icons/warning.png";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import LinkButton from "components/buttons/react-router-link-button";

function EditElectionFormView(props) {
  const userManager = props.userManager;
  return (
    <Row id={"editElectionForm"}>
      {props.componentIsLoading ? (
        <SubRouteLoader />
      ) : (
        <Col md={{ span: 8, offset: 1 }}>
          <Helmet>
            <title> {process.env.REACT_APP_NAME} | Edit Election</title>
          </Helmet>
          {props.election !== null ? (
            <BaseCard>
              <p className="title poppins">Edit Election</p>
              <p className="subtitle poppins">
                Please fill in the form below to edit the current election
              </p>
              <form
                id={"electionCreationForm"}
                onSubmit={e => props.handleSubmit(e)}
                className={"poppins"}
              >
                <div className="fullWidth inputGroup">
                  <label htmlFor={"electionName"}>Election Name:</label>
                  <input
                    id={"electionName"}
                    type="text"
                    name={"electionName"}
                    value={props.electionName}
                    onChange={props.handleChange}
                    placeholder={"Election Name"}
                  />
                </div>
                <div className="fullWidth inputGroup">
                  <label htmlFor="startDate">Start Date:</label>
                  <DateTimePicker
                    id={"startDate"}
                    name={"startDate"}
                    onChange={props.handleStartDateChange}
                    value={props.startDate}
                  />
                </div>
                <div className="fullWidth inputGroup">
                  <label htmlFor="endDate">End Date:</label>
                  <DateTimePicker
                    id={"endDate"}
                    name={"endDate"}
                    onChange={props.handleEndDateChange}
                    value={props.endDate}
                  />
                </div>
                <div className="fullWidth clearfix">
                  <button type={"submit"} className={"submitForm"}>
                    {props.formIsSubmitting ? (
                      <i className="fas fa-spinner fa-pulse" />
                    ) : (
                      <>
                        <i className="far mr-2 fa-save" />
                        Submit
                      </>
                    )}
                  </button>
                  <LinkButton
                    className={"float-right cartogothic"}
                    backgroundcolor={"#020101"}
                    to={"/dashboard/election"}
                  >
                    <i className="fas fa-chevron-left" />
                    Back to Election
                  </LinkButton>
                </div>
              </form>
              {userManager.isOfficial() &&
                !props.componentIsLoading &&
                props.showErrorAlert && (
                  <SweetAlert
                    type={props.alertType}
                    allowEscape
                    closeOnClickOutside
                    title={props.errorTitle}
                    onConfirm={
                      (typeof props.alertCallBack).toLowerCase() === "function"
                        ? props.alertCallBack
                        : props.closeErrorModal
                    }
                    cancelBtnBsStyle="default"
                    onCancel={props.closeErrorModal}
                  >
                    <span className="cartogothic">{props.errorMessage}</span>
                  </SweetAlert>
                )}
            </BaseCard>
          ) : (
            <BaseCard id={"nullCard"}>
              <Helmet>
                <title>
                  {process.env.REACT_APP_NAME} | No Configured Election
                </title>
              </Helmet>
              <div className="clearfix">
                <div className="float-left iconContainer">
                  <img
                    src={warningIcon}
                    alt={"Warning: No Election Configured"}
                  />
                </div>
                <div className="float-left">
                  <h4 className={"nullCardTitle"}>
                    No Election has been configured
                  </h4>
                  <p className={"mt-4"}>
                    In order to use this section you have to create and
                    configure an election.
                  </p>
                  <ul className={"no-style m-0 p-0 h-menu"}>
                    <li>
                      <Link
                        id={"create-election-button"}
                        to={`/dashboard/election`}
                      >
                        Create
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </BaseCard>
          )}
        </Col>
      )}
    </Row>
  );
}

export default EditElectionFormView;
