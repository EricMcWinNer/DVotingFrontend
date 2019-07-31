import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import "./index.sass";
/*
  TODO - FIND A BETTER DATEPICKER
 */
function RegisterView(props) {
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
              />
            </Col>
            <Col md={4}>
              <label htmlFor="gender" className={"required"}>
                Gender
              </label>
              <select
                id={"gender"}
                name={"gender"}
                className={"custom-select"}
                onChange={e => props.handleChange(e)}
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
                className={"custom-select"}
                name={"maritalStatus"}
                onChange={e => props.handleChange(e)}
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
                placeholder={"Email Address"}
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
              />
            </Col>
            <Col md={4}>
              <label htmlFor="stateOfOrigin" className="required">
                State of origin
              </label>
              <select
                id={"stateOfOrigin"}
                className={"custom-select"}
                name={"stateOfOrigin"}
                onChange={e => props.handlePickedStateOfOrigin(e)}
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
                className={"custom-select"}
                name={"lgaOfOrigin"}
                onChange={e => props.handleChange(e)}
              >
                <option value={""}>
                  {props.lgasLoading
                    ? "Please wait...LGAs are loading..."
                    : "Select your local government area"}
                </option>
                {lgas}
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
              />
            </Col>
            <Col md={4}>
              <label htmlFor="address2">Address 2</label>
              <input
                id={"address2"}
                type="text"
                name={"address2"}
                placeholder={"Address 2"}
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
              />
            </Col>
          </Row>
          <Row className={"newLine"}>
            <Col md={4}>
              <label htmlFor="profilePicture" className="required">
                Profile Picture
              </label>
              <input
                type={"file"}
                id={"profilePicture"}
                name={"profilePicture"}
                placeholder={"Profile Picture"}
              />
            </Col>
          </Row>
          <Row className="newLine">
            <Col md={{ span: 4, offset: 4 }}>
              <button id={"cancelButton"}>Cancel</button>
            </Col>
            <Col md={{ span: 4 }}>
              <button id={"submitButton"}>Submit</button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
}

export default RegisterView;
