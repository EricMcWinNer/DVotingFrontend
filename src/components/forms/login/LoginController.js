import React, { Component } from "react";
import axios from "axios";

import LoginView from "./LoginView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";
import { validateEmail } from "utils/validate";

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
      formIsSubmitting: false,
      ...initialAjaxAlertState,
    };
  }

  showAlert = (
    errorTitle,
    errorMessage,
    alertType = "warning",
    alertCallBack = null
  ) => {
    this.setState({
      showErrorAlert: true,
      errorTitle,
      errorMessage,
      alertType,
      alertCallBack,
    });
  };

  closeErrorModal = () => {
    this.setState({
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertCallBack: null,
    });
  };

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
        if (
          this.state.email.length < 3 ||
          this.state.password.length < 1 ||
          !validateEmail(this.state.email)
        ) {
          this.showAlert(
            "Invalid Credentials!",
            "The email or password you entered is invalid",
            "error"
          );
          if (this._mounted) this.setState({ formIsSubmitting: false });
          return;
        }
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
              this.showAlert(
                "Invalid Credentials!",
                "The email or password you entered is incorrect",
                "error"
              );
            } else if (res.data.isValid === true) {
              this.props.redirectSignedInUser();
            } else {
              //DO NOTHING. IT IS IMPOSSIBLE FOR THIS SCENARIO TO OCCUR THOUGH
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
          closeErrorModal={this.closeErrorModal}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default LoginController;
