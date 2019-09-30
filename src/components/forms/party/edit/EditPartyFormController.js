import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import UserManager from "security/UserManager";
import EditPartyFormView from "./EditPartyFormView";

class EditPartyFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      party: null,
      partyName: "",
      acronym: "",
      partyLogoFile: null,
      fileNotImage: false,
      formIsSubmitting: false,
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
    //TODO UPDATE THIS CODE TO HANDLE PROPER USER VALIDATION
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}`,
      {
        method: "get",
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          party: res.data.party,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.party !== null && prevState.party === null)
      this.setState({
        partyName: this.state.party.name,
        acronym: this.state.party.acronym,
        partyLogoURL: `${process.env.REACT_APP_API_PATH}/storage/${this.state.party.logo}`,
      });
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
      this.setState({
        [name]: value,
      });
    }
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
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true });
      axios.defaults.withCredentials = true;
      let formData = new FormData();
      formData.append("partyName", this.state.partyName);
      formData.append("acronym", this.state.acronym);
      formData.append("partyLogo", this.state.partyLogoFile);
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}/edit`,
        {
          method: "post",
          data: formData,
        }
      ).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
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
              "Political party edited successfully",
              "success",
              this.redirectToPartyHome
            );
          } else {
            this.showAlert(
              "Error",
              "Something went wrong. Please try again later, contact the developer is problem persists"
            );
          }
        }
      });
    }
  };

  render() {
    return (
      <EditPartyFormView
        updatePartyLogo={this.updatePartyLogo}
        onChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        userManager={this._userManager}
        closeErrorModal={this.closeErrorModal}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default EditPartyFormController;
