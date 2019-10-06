import React, { Component } from "react";
import axios from "axios";

import LoginView from "./LoginView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formIsSubmitting: false,
      ...initialAjaxAlertState,
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
        [name]: value,
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
        axios(`${process.env.REACT_APP_API_PATH}/api/web/auth/login`, {
          method: "post",
          data: form,
        })
          .then(res => {
            if (res.data.status === "error") {
              alert("Your email or password is invalid.");
            } else if (res.data.isValid === true) {
              this.props.redirectSignedInUser();
            } else {
              //DO NOTHING
            }
            if (this._mounted) this.setState({ formIsSubmitting: false });
          })
          .catch(res => {
            this.setState({ formIsSubmitting: false });
            fireAjaxErrorAlert(this, res.request.status, null, false);
          });
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <LoginView
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default LoginController;
