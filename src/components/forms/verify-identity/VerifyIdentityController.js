import React, { Component } from "react";
import axios from "axios";

import VerifyIdentityView from "./VerifyIdentityView";
import UserManager from "security/UserManager";

class VerifyIdentityController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      formSubmitting: false,
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  closeErrorModal = () => {
    this.setState({
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertCallBack: null,
    });
  };

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

  handleChange = e => {
    let { name, value, type, tagName } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      tagName.toLowerCase() === "select" ||
      type === "date"
    ) {
      this.setState({
        [name]: value,
      });
    }
  };

  redirectToResults = () => {
    this.props.history.push("/dashboard/results");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    axios.defaults.withCredentials = true;
    let form = new FormData();
    form.append("password", this.state.password);
    const req = axios
      .post(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/vote/${this.props.party.id}`,
        form
      )
      .then(res => {
        this.setState({ formSubmitting: false });
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          if (res.data.voted)
            this.showAlert(
              "You have voted already",
              "Users are allowed to vote only once and you have already voted. Click the link below to view the real-time results",
              "info",
              this.redirectToResults
            );
          else if (res.data.password === "wrong")
            this.showAlert(
              "Incorrect Password",
              "The password you entered does not match our records. Please enter the correct one to vote",
              "error",
              this.closeErrorModal
            );
          else if (res.data.completed)
            this.showAlert(
              "Voted Successfully",
              "You have successfully voted in the current election. Please click the link below to view the real-time results",
              "success",
              this.redirectToResults
            );
        }
      });
    return req;
  };

  render() {
    return (
      <VerifyIdentityView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        userManager={this._userManager}
        closeErrorModal={this.closeErrorModal}
        {...this.state}
      />
    );
  }
}

export default VerifyIdentityController;
