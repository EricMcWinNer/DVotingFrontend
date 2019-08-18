import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

import "components/forms/register/register.sass";

/*
  TODO - FIND A BETTER DATEPICKER
 */
function RegisterView(props) {
  const [show, setShow] = useState(props.fileNotImage);
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
                className={props.validLastName ? "" : "error"}
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
                className={props.validOtherNames ? "" : "error"}
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
                <option value={""}>Select your gender</option>
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
                <option value={""}>Select your marital status</option>
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
                className={props.validEmail ? "" : "error"}
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
                className={props.validPhoneNumber ? "" : "error"}
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
              <input
                id={"dob"}
                type={"date"}
                name={"dob"}
                placeholder={"Date of birth"}
                onChange={e => props.handleChange(e)}
                value={props.dob}
              />
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
                    : "Select your state of origin"}
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
                    : "Select your local government area"}
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
                onChange={e => props.handleChange(e)}
                value={props.address2}
              />
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="password" className="required">
                Password
              </label>
              <input
                id={"password"}
                type="password"
                name={"password"}
                placeholder={"Password"}
                className={props.validPassword ? "" : "error"}
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
                className={props.validPassword ? "" : "error"}
                onChange={e => props.handleChange(e)}
                value={props.confirmPassword}
              />
            </Col>
            <Col md={4}>
              <label htmlFor="confirmationPin" className="required">
                Confirmation Pin
              </label>
              <input
                type="text"
                id={"confirmationPin"}
                name={"confirmationPin"}
                onChange={e => props.handleChange(e)}
                value={props.confirmationPin}
              />
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="profilePicture" className="required">
                Profile Picture
              </label>
              {props.profilePictureURL === null ? (
                <div />
              ) : (
                <div id={"imagePreview"} className={"b-100"}>
                  <img
                    src={props.profilePictureURL}
                    className={"b-100 force"}
                    alt={"Preview Profile Picture"}
                  />
                </div>
              )}
              <input
                type={"file"}
                id={"profilePicture"}
                name={"profilePicture"}
                placeholder={"Profile Picture"}
                accept="image/*"
                onChange={e => props.handleProfilePicture(e)}
              />
            </Col>
          </Row>
          <Row className="newLine">
            <Col md={{ span: 4, offset: 4 }}>
              <button disabled={props.allFieldsValid} id={"cancelButton"}>
                Cancel
              </button>
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
        <div className={"fixed-top"}>
          {props.fileNotImage ? (
            <Alert
              variant="danger"
              onClose={() => {
                setShow(false);
                props.dismissImageAlert();
              }}
              dismissible
            >
              <Alert.Heading>Uploaded File is not an Image</Alert.Heading>
              <p>
                The profile picture uploaded is not an image, change the file
                and try again
              </p>
            </Alert>
          ) : (
            <div />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default RegisterView;
