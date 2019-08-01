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
      profilePictureURL: null,
      profilePictureFile: null,
      fileNotImage: false,
      aspectRatioError: false,
      formIsSubmitting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.getStates();
  }

  getStates = () => {
    if (this._mounted) {
      axios
        .get(`${process.env.REACT_APP_API_PATH}/state/states`)
        .then(res => {
          this.setState({ states: res.data.states, statesLoading: false });
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

  dismissImageAlert = () => {
    if (this._mounted)
      this.setState({
        fileNotImage: false
      });
  };

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
            [name]: value
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
          confirmationPin: this.state.confirmationPin
        };
        const json = JSON.stringify(userInfo);
        const data = new FormData();
        data.append("userInfo", json);
        data.append("picture", this.state.profilePictureFile);
        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_PATH}/user/official/register`,
          data: data
        })
          .then(res => {
            console.log(res);
            this.setState({ formIsSubmitting: false }, () => {
              if (res.data.status === "error") {
                if (res.data.message === "password")
                  alert("The passwords you submitted do not match");
                else if (res.data.message === "emailExists")
                  alert(
                    "The email address you submitted has already been used"
                  );
                else if (res.data.message === "confirmationPin")
                  alert("The confirmation pin you entered is invalid");
                else
                  alert(`The ${res.data.message} you submitted is not valid`);
              } else {
                this.props.signInRedirect();
              }
            });
          })
          .catch(err => {
            console.log(err);
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
            .get(`${process.env.REACT_APP_API_PATH}/state/${value}/lgas`)
            .then(res => {
              this.setState({ lgas: res.data.lgas, lgasLoading: false });
            });
        });
  };

  handleProfilePicture = e => {
    this.readURI(e);
  };

  readURI(e) {
    const fileTypes = ["jpg", "jpeg", "png"];
    if (this._mounted)
      if (e.target.files && e.target.files[0]) {
        const extension = e.target.files[0].name
            .split(".")
            .pop()
            .toLowerCase(), //file extension from input file
          isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
        if (isSuccess) {
          this.setState({ profilePictureFile: e.target.files[0] });
          let reader = new FileReader();
          //TODO WRITE CODE TO CHECK FOR ASPECT RATIO ON FRONTEND
          reader.onload = function(ev) {
            this.setState({
              profilePictureURL: ev.target.result,
              fileNotImage: false
            });
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        } else {
          this.setState({ fileNotImage: true, profilePictureURL: null });
        }
      }
  }

  render() {
    return (
      <RegisterView
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handlePickedStateOfOrigin={this.handlePickedStateOfOrigin}
        handleProfilePicture={this.handleProfilePicture}
        dismissImageAlert={this.dismissImageAlert}
      />
    );
  }
}

export default RegisterController;
