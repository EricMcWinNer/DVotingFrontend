import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Col from "react-bootstrap/Col";
import createIcon from "assets/img/icons/create.png";
import Row from "react-bootstrap/Row";
import SweetAlert from "react-bootstrap-sweetalert";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import Helmet from "react-helmet";
import PictureUploadInput from "components/forms/picture-upload-handler";

function CreatePartyFormView(props) {
  const userManager = props.userManager;
  return (
    <Row id={"createPartyForm"}>
      {props.componentIsLoading ? (
        <SubRouteLoader />
      ) : (
        <Col md={{ span: 8, offset: 1 }}>
          <BaseCard>
            <Helmet>
              <title>{process.env.REACT_APP_NAME} | Create Party</title>
            </Helmet>
            <div className="title clearfix o-auto">
              <div className="float-left">
                <img
                  src={createIcon}
                  alt="Create Political Party"
                  className={"title-icon small"}
                />
              </div>
              <div className="float-left">
                <p className={"title"}>Create Political Party</p>
              </div>
            </div>
            <p className="subtitle poppins">
              Please fill in the form below to create a political party
            </p>
            <form
              id={"createPartyForm"}
              onSubmit={e => props.handleSubmit(e)}
              className={"poppins"}
            >
              <div className="fullWidth inputGroup">
                <label htmlFor={"partyName"}>Party Full Name:</label>
                <input
                  id={"partyName"}
                  type="text"
                  name={"partyName"}
                  value={props.partyName}
                  onChange={props.onChange}
                  placeholder={"e.g People's Democratic Party"}
                />
              </div>
              <div className="fullWidth inputGroup">
                <label htmlFor="acronym">Acronym:</label>
                <input
                  id={"acronym"}
                  type="text"
                  name={"acronym"}
                  value={props.acronym.toUpperCase()}
                  onChange={props.onChange}
                  maxLength={6}
                  placeholder={"e.g PDP"}
                />
              </div>
              <PictureUploadInput
                forcefullyCancel={props.forcefullyCancel}
                label={"Party Logo:"}
                updatePictureFile={props.updatePartyLogo}
                removeForcefullyCancel={props.removeForcefullyCancel}
              />
              <div className="fullWidth my-3 inputGroup">
                <div className="custom-control d-flex align-items-center custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck"
                    name="stayOnPage"
                    checked={props.stayOnPage}
                    onChange={props.handleCheckBoxChange}
                  />
                  <label
                    className="custom-control-label cartogothic"
                    htmlFor="customCheck"
                  >
                    Stay on page after creating
                  </label>
                </div>
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
                  to={"/dashboard/party"}
                >
                  <i className="fas fa-chevron-left" />
                  Back to Parties
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
        </Col>
      )}
    </Row>
  );
}

export default CreatePartyFormView;
