import React, { Component } from "react";
import axios from "axios";

import RegisterView from "./RegisterView";

class RegisterController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      otherNames: "",
      gender: "",
      maritalStatus: "",
      email: "",
      phoneNumber: "",
      dob: "",
      states: [],
      statesLoading: true,
      lgasLoading: false,
      lgas: [],
      occupation: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      address1: "",
      address2: "",
      password: "",
      confirmPassword: "",
      confirmationPin: "",
      profilePictureURL: null,
      fileNotImage: false,
      aspectRatioError: false
    };
  }

  componentDidMount() {
    this.getStates();
  }

  getStates = () => {
    axios
      .get(`${process.env.REACT_APP_API_PATH}/state/states`)
      .then(res => {
        this.setState({ states: res.data.states, statesLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}

  dismissImageAlert = () => {
    this.setState({
      fileNotImage: false
    });
  };

  handleChange = e => {
    let { name, value, type } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      type === "select" ||
      type === "date"
    ) {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formIsSubmitting: true }, () => {
      setTimeout(() => this.setState({ formIsSubmitting: false }), 3500);
    });
  };

  handlePickedStateOfOrigin = e => {
    let { value } = e.target;
    if (value !== "")
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
    if (e.target.files && e.target.files[0]) {
      const extension = e.target.files[0].name
          .split(".")
          .pop()
          .toLowerCase(), //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
      if (isSuccess) {
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
