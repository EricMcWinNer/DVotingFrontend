import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-date-picker";
import LinkButton from "components/buttons/react-router-link-button";
import PictureUploadInput from "components/forms/picture-upload-handler";

import "./index.sass";
import SweetAlert from "react-bootstrap-sweetalert";

/*
  TODO - FIND A BETTER DATEPICKER
 */
function RegisterView(props) {
  let containerRef = React.createRef();

  const [offsetWidth, setOffsetWidth] = useState(0);

  useEffect(() => {
    setOffsetWidth(containerRef.current.offsetWidth);
  }, [containerRef]);

  const states = props.states.map(state => (
    <option key={state.state_id} value={state.state_id}>
      {state.name}
    </option>
  ));
  const lgas = props.lgas.map(lga => (
    <option key={lga.lga_id} value={lga.lga_id}>
      {lga.name}
    </option>
  ));
  return (
    <Row id={"registerForm"}>
      <Col sm={12}>
        <form action="">
          <Row>
            <Col md={4}>
              <label htmlFor={"lastName"} className={"required"}>
                Last Name
              </label>
              <input
                id={"lastName"}
                type="text"
                name={"lastName"}
                placeholder={"Last Name"}
                className={`${props.validLastName ? "" : "error"} normal`}
                onChange={e => props.handleChange(e)}
                value={props.lastName}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="otherNames" className={"required"}>
                Other Names{" "}
              </label>
              <input
                id={"otherNames"}
                type="text"
                name={"otherNames"}
                placeholder={"Other Names"}
                className={`${props.validOtherNames ? "" : "error"} normal`}
                onChange={e => props.handleChange(e)}
                value={props.otherNames}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="gender" className={"required"}>
                Gender
              </label>
              <select
                id={"gender"}
                name={"gender"}
                className={
                  props.validGender ? "custom-select" : "custom-select  error"
                }
                onChange={e => props.handleChange(e)}
                value={props.gender}
              >
                <option value={""}>
                  {props.officerMode === undefined
                    ? "Select your gender"
                    : "Select voter's gender"}
                </option>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="maritalStatus" className="required">
                Marital Status
              </label>
              <select
                id={"maritalStatus"}
                className={`custom-select`}
                name={"maritalStatus"}
                onChange={e => props.handleChange(e)}
                value={props.maritalStatus}
              >
                <option value={""}>
                  {props.officerMode === undefined
                    ? "Select your marital status"
                    : "Select voter's marital status"}
                </option>
                <option value={0}>Single</option>
                <option value={1}>Married</option>
                <option value={2}>Divorced</option>
                <option value={3}>Widowed</option>
              </select>
            </Col>
            <Col md={4}>
              <label htmlFor="email" className={"required"}>
                Email
              </label>
              <input
                id={"email"}
                type="email"
                name={"email"}
                className={`${props.validEmail ? "" : "error"} normal`}
                placeholder={"Email Address"}
                onChange={e => props.handleChange(e)}
                value={props.email}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="phoneNumber" className={"required"}>
                PhoneNumber
              </label>
              <input
                id={"phoneNumber"}
                type="text"
                name={"phoneNumber"}
                placeholder={"Phone Number"}
                className={`${props.validPhoneNumber ? "" : "error"} normal`}
                onChange={e => props.handleChange(e)}
                value={props.phoneNumber}
              />
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="dob" className="required">
                Date of birth
              </label>
              <DatePicker value={props.dob} onChange={props.changeDob} />
            </Col>
            <Col md={4}>
              <label htmlFor="occupation" className="required">
                Occupation
              </label>
              <input
                id={"occupation"}
                type={"text"}
                name={"occupation"}
                placeholder={"Occupation"}
                className={"normal"}
                onChange={e => props.handleChange(e)}
                value={props.occupation}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="stateOfOrigin" className="required">
                State of origin
              </label>
              <select
                id={"stateOfOrigin"}
                className={`custom-select ${
                  props.validStateOfOrigin ? "" : "error"
                }`}
                name={"stateOfOrigin"}
                onChange={e => props.handlePickedStateOfOrigin(e)}
                value={props.stateOfOrigin}
              >
                <option value={""}>
                  {props.statesLoading
                    ? "Please wait...states are loading..."
                    : props.officerMode === undefined
                    ? "Select your state of origin"
                    : "Select voter's state of origin"}
                </option>
                {states}
              </select>
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="lgaOfOrigin" className={"required"}>
                LGA
              </label>
              <select
                id={"lgaOfOrigin"}
                className={`custom-select ${
                  props.validLgaOfOrigin ? "" : "error"
                }`}
                name={"lgaOfOrigin"}
                onChange={e => props.handleChange(e)}
                value={props.lgaOfOrigin}
              >
                <option value={""}>
                  {props.lgasLoading
                    ? "Please wait...LGAs are loading..."
                    : props.officerMode === undefined
                    ? "Select your Local Government Area"
                    : "Select voter's Local Government Area"}
                </option>
                {props.lgasLoading ? "" : lgas}
              </select>
            </Col>
            <Col md={4}>
              <label htmlFor="address1" className={"required"}>
                Address 1
              </label>
              <input
                type="text"
                id={"address1"}
                name={"address1"}
                className={"normal"}
                placeholder={"Address 1"}
                onChange={e => props.handleChange(e)}
                value={props.address1}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="address2">Address 2</label>
              <input
                id={"address2"}
                type="text"
                name={"address2"}
                placeholder={"Address 2"}
                className={"normal"}
                onChange={e => props.handleChange(e)}
                value={props.address2}
              />
            </Col>
          </Row>
          <Row className={"newLine"}>
            {props.editMode === undefined && (
              <>
                <Col md={4}>
                  <label htmlFor="password" className="required">
                    Password
                  </label>
                  <input
                    id={"password"}
                    type="password"
                    name={"password"}
                    placeholder={"Password"}
                    className={`${props.validPassword ? "" : "error"} normal`}
                    onChange={e => props.handleChange(e)}
                    value={props.password}
                  />
                </Col>
                <Col md={4}>
                  <label htmlFor="confirmPassword" className="required">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    placeholder={"Confirm Password"}
                    className={`${props.validPassword ? "" : "error"} normal`}
                    onChange={e => props.handleChange(e)}
                    value={props.confirmPassword}
                  />
                </Col>
              </>
            )}
            {props.officerMode === undefined && (
              <Col md={4}>
                <label htmlFor="confirmationPin" className="required">
                  Confirmation Pin
                </label>
                <input
                  type="text"
                  id={"confirmationPin"}
                  name={"confirmationPin"}
                  className={"normal"}
                  onChange={e => props.handleChange(e)}
                  value={props.confirmationPin}
                />
              </Col>
            )}
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <div className="fullWidth" ref={containerRef}>
                <PictureUploadInput
                  required
                  fancyInput
                  useWebcam
                  defaultPictureUrl={
                    props.editMode !== undefined
                      ? `${process.env.REACT_APP_API_PATH}/storage/${props.voter.picture}`
                      : undefined
                  }
                  webCamWidth={offsetWidth}
                  label={"Profile Picture"}
                  updatePictureFile={props.udpateProfilePicture}
                  forcefullyRemovePreview={props.forcefullyRemovePreview}
                  forcefullyShowPreview={props.forcefullyShowPreview}
                />
              </div>
            </Col>
          </Row>
          <Row className="newLine">
            <Col md={{ span: 4, offset: 4 }}>
              <LinkButton
                to={
                  props.cancelUrl === undefined
                    ? "/dashboard/login"
                    : props.cancelUrl
                }
                disabled={props.allFieldsValid}
                className={"text-center"}
                id={"cancelButton"}
              >
                Cancel
              </LinkButton>
            </Col>
            <Col md={{ span: 4 }}>
              <button onClick={e => props.handleSubmit(e)} id={"submitButton"}>
                {props.formIsSubmitting ? (
                  <i className="fas fa-spinner fa-pulse" />
                ) : (
                  "Submit"
                )}
              </button>
            </Col>
          </Row>
        </form>
      </Col>
      {props.showAlert && (
        <SweetAlert
          type={props.alertType}
          allowEscape
          closeOnClickOutside
          title={props.alertTitle}
          onConfirm={
            (typeof props.alertCallBack).toLowerCase() === "function"
              ? props.alertCallBack
              : props.closeAlert
          }
          onCancel={props.closeAlert}
        >
          <span className="cartogothic">{props.alertMessage}</span>
        </SweetAlert>
      )}
    </Row>
  );
}

export default RegisterView;
