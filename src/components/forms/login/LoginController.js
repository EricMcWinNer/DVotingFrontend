import React, { Component } from "react";
import axios from "axios";

import LoginView from "./LoginView";

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formIsSubmitting: false
    };
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
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        axios.defaults.withCredentials = true;
        axios(`${process.env.REACT_APP_API_PATH}/api/login`, {
          method: "post",
          data: form
        })
          .then(res => {
            if (res.data.status == "error") {
              alert("Your email or password is invalid.");
            } else if (res.data.isValid == "true") {
              this.props.redirectSignedInUser();
            } else {
              //DO NOTHING
            }
            this.setState({ formIsSubmitting: false });
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
