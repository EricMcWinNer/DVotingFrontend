import React, { Component } from "react";
import axios from "axios";

import RegisterView from "./RegisterView";
import { validateEmail } from "utils/validate";

class RegisterController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      validLastName: true,
      otherNames: "",
      validOtherNames: true,
      gender: "",
      validGender: true,
      maritalStatus: "",
      validMaritalStatus: true,
      email: "",
      validEmail: true,
      phoneNumber: "",
      validPhoneNumber: true,
      dob: "",
      states: [],
      statesLoading: true,
      lgasLoading: false,
      lgas: [],
      occupation: "",
      stateOfOrigin: "",
      validStateOfOrigin: true,
      lgaOfOrigin: "",
      validLgaOfOrigin: true,
      address1: "",
      address2: "",
      password: "",
      validPassword: true,
      confirmPassword: "",
      confirmationPin: "",
      profilePictureFile: null,
      aspectRatioError: false,
      formIsSubmitting: false,
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertType: "",
      alertCallBack: null,
      webcamWidth: "",
      forcefullyRemovePreview: false,
    };
  }

  forcefullyShowPreview = () => {
    this.setState({ forcefullyRemovePreview: false });
  };

  initializeRoute = () => {
    console.log("I got here");
    this.setState({
      lastName: "",
      otherNames: "",
      gender: "",
      maritalStatus: "",
      email: "",
      phoneNumber: "",
      dob: "",
      occupation: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      address1: "",
      address2: "",
      password: "",
      confirmPassword: "",
      confirmationPin: "",
      profilePictureFile: null,
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertType: "",
      alertCallBack: null,
      forcefullyRemovePreview: true,
    });
  };

  componentDidMount() {
    this._mounted = true;
    if (this.props.editMode) {
      const voter = this.props.voter;
      const maritalStatus = [
        "single",
        "married",
        "divorced",
        "widowed",
      ].findIndex(item => item === voter.marital_status);
      this.getStates(voter.state_id);
      const { name } = voter;
      const nameArray = name.split(" ");
      this.setState({
        lastName: nameArray[0],
        otherNames: `${nameArray[1]} ${nameArray[2]}`,
        gender: voter.gender == "male" ? 0 : 1,
        maritalStatus: maritalStatus,
        email: voter.email,
        phoneNumber: voter.phone_number,
        dob: new Date(voter.dob.dob),
        occupation: voter.occupation,
        stateOfOrigin: voter.state_id,
        lgaOfOrigin: voter.lga_id,
        address1: voter.address1,
        address2: voter.address2,
      });
    } else this.getStates();
  }

  udpateProfilePicture = picture => {
    this.setState({ profilePictureFile: picture });
  };

  displayAlert = (
    alertTitle,
    alertMessage,
    alertType = "warning",
    alertCallBack = null
  ) => {
    this.setState({
      showAlert: true,
      alertTitle,
      alertMessage,
      alertType,
      alertCallBack,
    });
  };

  closeAlert = () => {
    this.setState({
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertCallBack: null,
    });
  };

  getStates = (stateId = null) => {
    if (this._mounted) {
      axios
        .get(
          stateId !== null
            ? `${process.env.REACT_APP_API_PATH}/api/misc/state/${stateId}`
            : `${process.env.REACT_APP_API_PATH}/api/misc/states`
        )
        .then(res => {
          if (stateId === null)
            this.setState({ states: res.data.states, statesLoading: false });
          else
            this.setState({
              states: res.data.states,
              lgas: res.data.lgas,
              statesLoading: false,
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    this._mounted = false;
  }

  handleChange = e => {
    let { name, value, type, tagName } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      tagName.toLowerCase() === "select" ||
      type === "date"
    ) {
      if (this._mounted)
        this.setState(
          {
            [name]: value,
          },
          () => {
            if (type === "email")
              this.setState({ validEmail: validateEmail(value) });
            else if (name === "lastName") {
              let array = value.split(" ");
              if (array.length !== 1) this.setState({ validLastName: false });
              else this.setState({ validLastName: true });
            } else if (name === "otherNames") {
              let array = value.split(" ");
              if (array.length < 2) this.setState({ validOtherNames: false });
              else this.setState({ validOtherNames: true });
            } else if (name === "phoneNumber") {
              if (value.length < 1) this.setState({ validPhoneNumber: false });
              else this.setState({ validPhoneNumber: true });
            } else if (name === "password" || name === "confirmPassword") {
              if (this.state.password !== this.state.confirmPassword) {
                this.setState({ validPassword: false });
              } else this.setState({ validPassword: true });
            }
          }
        );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this._mounted)
      this.setState({ formIsSubmitting: true }, () => {
        let userInfo = {
          lastName: this.state.lastName,
          otherNames: this.state.otherNames,
          gender: this.state.gender,
          maritalStatus: this.state.maritalStatus,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          dob: this.state.dob,
          occupation: this.state.occupation,
          stateOfOrigin: this.state.stateOfOrigin,
          lgaOfOrigin: this.state.lgaOfOrigin,
          address1: this.state.address1,
          address2: this.state.address2,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          confirmationPin: this.state.confirmationPin,
          ...this.props.customValues,
        };
        const json = JSON.stringify(userInfo);
        const data = new FormData();
        data.append("userInfo", json);
        data.append("picture", this.state.profilePictureFile);
        axios({
          method: "post",
          url:
            this.props.url === undefined
              ? `${process.env.REACT_APP_API_PATH}/api/web/auth/official/register`
              : this.props.url,
          data: data,
          withCredentials: true,
        })
          .then(res => {
            console.log(res);
            this.setState({ formIsSubmitting: false }, () => {
              if (res.data.isValid == false) {
                if (res.data.field === "password")
                  this.displayAlert(
                    "Invalid Password",
                    "The passwords you submitted do not match"
                  );
                else if (res.data.field === "emailExists")
                  this.displayAlert(
                    "Invalid e-mail",
                    "The email address you submitted has already been used"
                  );
                else if (res.data.field === "confirmationPin")
                  this.displayAlert(
                    "Invalid Registration Pin",
                    "The confirmation pin you entered is invalid"
                  );
                else if (res.data.field === "confirmationPinUsed")
                  this.displayAlert(
                    "Invalid Registration Pin",
                    "The confirmation pin you entered has already been used"
                  );
                else if (res.data.field === "tooYoung")
                  this.displayAlert(
                    "Invalid Age",
                    "You must be at least 18 years old to be an register-official"
                  );
                else
                  this.displayAlert(
                    "Invalid Entry",
                    `The ${res.data.field} you submitted is not valid`
                  );
              } else if ("exception" in res.data)
                this.displayAlert(
                  "Error!",
                  "Something went wrong, please try again later",
                  "error"
                );
              else {
                this.displayAlert(
                  "Success!",
                  this.props.editMode === undefined
                    ? "Account registered successfully."
                    : "Account updated successfully",
                  "success",
                  this.props.stayOnPage === undefined
                    ? this.props.signInRedirect
                    : this.props.editMode === undefined
                    ? this.initializeRoute
                    : null
                );
              }
            });
          })
          .catch(err => {
            this.setState({ formIsSubmitting: false });
          });
      });
  };

  handlePickedStateOfOrigin = e => {
    let { value } = e.target;
    if (value !== "")
      if (this._mounted)
        this.setState({ stateOfOrigin: value, lgasLoading: true }, () => {
          axios
            .get(
              `${process.env.REACT_APP_API_PATH}/api/misc/state/${value}/lgas`
            )
            .then(res => {
              this.setState({ lgas: res.data.lgas, lgasLoading: false });
            });
        });
  };

  changeDob = date => this.setState({ dob: date });

  render() {
    return (
      <RegisterView
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handlePickedStateOfOrigin={this.handlePickedStateOfOrigin}
        updateCampaignPicture={this.updateCampaignPicture}
        dismissImageAlert={this.dismissImageAlert}
        closeAlert={this.closeAlert}
        changeDob={this.changeDob}
        udpateProfilePicture={this.udpateProfilePicture}
        calcWidth={this.calcWidth}
        pictureContainer={this.pictureContainer}
        forcefullyShowPreview={this.forcefullyShowPreview}
      />
    );
  }
}

export default RegisterController;
