import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CreatePartyFormView from "./CreatePartyFormView";
import UserManager from "security/UserManager";
import { sentenceCase } from "utils/helpers";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class CreatePartyFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      partyName: "",
      acronym: "",
      partyLogoFile: null,
      fileNotImage: false,
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
      stayOnPage: false,
      forcefullyCancel: false,
      ...initialAjaxAlertState,
    };
    this._userManager = new UserManager(this.props.user);
  }

  initializeForms = () => {
    this.setState({
      partyName: "",
      acronym: "",
      partyLogoFile: null,
      forcefullyCancel: true,
    });
  };

  removeForcefullyCancel = () => {
    this.setState({ forcefullyCancel: false });
  };

  componentDidMount() {
    this._mounted = true;
    //TODO UPDATE THIS CODE TO HANDLE PROPER USER VALIDATION
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/web/auth/validate-web-app-session`,
      {
        method: "get",
      }
    )
      .then(res => {
        if (res.data.isSessionValid === false)
          this.props.history.push("/login");
        else {
          this.setState({
            componentIsLoading: false,
          });
        }
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

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
      if (name === "partyName") value = sentenceCase(value);
      this.setState({
        [name]: value,
      });
    }
  };

  handleCheckBoxChange = e => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked,
    });
  };

  updatePartyLogo = picture => {
    this.setState({ partyLogoFile: picture });
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

  redirectToPartyHome = () => {
    this.props.history.push("/dashboard/party");
  };

  closeErrorModal = () => {
    this.setState({
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertCallBack: null,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this._mounted) {
      this.setState({ formIsSubmitting: true }, () => {
        axios.defaults.withCredentials = true;
        let form = new FormData();
        form.append("partyName", this.state.partyName);
        form.append("acronym", this.state.acronym);
        form.append("partyLogo", this.state.partyLogoFile);
        axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/party`, {
          method: "post",
          data: form,
        })
          .then(res => {
            if (res.data.isSessionValid === false)
              this.props.history.push("/login");
            else {
              this.setState({
                formIsSubmitting: false,
              });
              if (res.data.isValid === false) {
                if (res.data.field === "partyLogo")
                  this.showAlert(
                    "Invalid Party Logo",
                    "The party logo you entered is invalid"
                  );
                else if (res.data.field === "partyName")
                  this.showAlert(
                    "Invalid Party Name",
                    "The party name you entered is invalid. Please enter one less than 256 characters long"
                  );
                else if (res.data.field === "acronym")
                  this.showAlert(
                    "Invalid Acronym",
                    "The acronym you entered is invalid. Please enter one less than 7 characters long"
                  );
                else if (res.data.field === "duplicateName")
                  this.showAlert(
                    "Duplicate Party Name",
                    "A political party with this name already exists. Political parties must have unique names."
                  );
              } else if (res.data.completed === true) {
                this.showAlert(
                  "Success!",
                  "Political party created successfully",
                  "success",
                  this.state.stayOnPage ? null : this.redirectToPartyHome
                );
                if (this.state.stayOnPage) this.initializeForms();
              }
            }
          })
          .catch(res =>
            fireAjaxErrorAlert(this, res.request.status, null, false)
          );
      });
    }
  };

  render() {
    return (
      <>
        <CreatePartyFormView
          updatePartyLogo={this.updatePartyLogo}
          handleSubmit={this.handleSubmit}
          onChange={this.handleChange}
          userManager={this._userManager}
          closeErrorModal={this.closeErrorModal}
          handleCheckBoxChange={this.handleCheckBoxChange}
          removeForcefullyCancel={this.removeForcefullyCancel}
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default CreatePartyFormController;
