import React, { Component } from "react";

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
      occupation: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      address1: "",
      address2: "",
      password: "",
      confirmPassword: "",
      confirmationPin: "",
      profilePicture: ""
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}

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

  render() {
    return <RegisterView />;
  }
}

export default RegisterController;
