import React, { Component } from "react";
import axios from "axios";
import UserSession from "security/UserSession";

import LoginView from "./LoginView";

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formIsSubmitting: false
    };
    console.log(new UserSession().jwt);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleChange = e => {
    let { name, value, type } = e.target;
    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true }, () => {
        axios
          .post(`${process.env.REACT_APP_API_PATH}/login`, {
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <LoginView
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default LoginController;
