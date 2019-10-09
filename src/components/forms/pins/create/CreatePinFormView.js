import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import BaseCard from "components/cards/base-card/BaseCard";
import Helmet from "react-helmet";
import { capitalize } from "utils/helpers";
import registrationPin from "assets/img/icons/padlock.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import SweetAlert from "react-bootstrap-sweetalert";
import PureSelect from "components/dashboard/pure-select";

function CreatePinRouteView(props) {
  const userManager = props.userManager;
  return (
    <Row id={"createPin"}>
      <Helmet>
        <title>
          {process.env.REACT_APP_NAME} | Create New{" "}
          {capitalize(props.typeOfPins)} Pins
        </title>
      </Helmet>
      <Col md={{ span: 8, offset: 1 }}>
        <BaseCard id={"nullCard"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={registrationPin}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Create Registration Pins</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can create registration pins to be used by
            unregistered users to be automatically registered as officers or
            officials.
          </p>
          <form
            id={"pinCreationForm"}
            onSubmit={e => props.handleCreate(e)}
            className={"poppins"}
          >
            <div className="fullWidth inputGroup">
              <label htmlFor="typeOfPins">Type of Pin:</label>
              <PureSelect
                name={"typeOfPins"}
                className={"custom-select basecard-select"}
                onChange={e => props.handleChange(e)}
                value={props.typeOfPins}
                id={"typeOfPins"}
                required
              >
                <option value={""}>Select a pin type</option>
                <option value={"officials"}>Official pins</option>
                <option value={"officers"}>Officer pins</option>
              </PureSelect>
            </div>
            <div className="fullWidth inputGroup">
              <label htmlFor="noOfPins">Number of Pins:</label>
              <PureSelect
                name={"noOfPins"}
                className={"custom-select basecard-select"}
                onChange={e => props.handleChange(e)}
                value={props.noOfPins}
                id={"noOfPins"}
                required
              >
                <option value={""}>Select a number of pins:</option>
                <option value={"1"}>1</option>
                <option value={"5"}>5</option>
                <option value={"10"}>10</option>
                <option value={"20"}>20</option>
                <option value={"50"}>50</option>
                <option value={"100"}>100</option>
                <option value={"200"}>200</option>
                <option value={"500"}>500</option>
                <option value={"1000"}>1000</option>
                <option value={"5000"}>5000</option>
                <option value={"10000"}>10000</option>
                <option value={"50000"}>50000</option>
                <option value={"100000"}>100000</option>
              </PureSelect>
            </div>
            <div className="fullWidth mt-5 clearfix">
              <button type={"submit"} className={"submitForm"}>
                {props.creating ? (
                  <i className="fas fa-spinner fa-pulse" />
                ) : (
                  <>
                    <i className="fas mr-2 fa-cogs" />
                    Generate
                  </>
                )}
              </button>
              <LinkButton
                className={"float-right cartogothic"}
                backgroundcolor={"#020101"}
                to={"/dashboard/pins"}
              >
                <i className="fas fa-chevron-left" />
                Back to pins
              </LinkButton>
            </div>
          </form>
          {userManager.isOfficial() && props.showErrorAlert && (
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
    </Row>
  );
}

export default CreatePinRouteView;
