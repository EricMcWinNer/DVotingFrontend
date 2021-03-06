import React, { Component } from "react";
import axios from "axios";
import UserManager from "security/UserManager";

import CreateElectionFormView from "./CreateElectionFormView";
import { sentenceCase } from "utils/helpers";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class CreateElectionFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electionName: "",
      startDate: "",
      endDate: "",
      formIsSubmitting: false,
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
      showElectionAlreadyExistsModal: true,
      ...initialAjaxAlertState,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleStartDateChange = startDate => {
    this.setState({ startDate });
  };
  handleEndDateChange = endDate => {
    this.setState({ endDate });
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
      if (name === "electionName") value = sentenceCase(value);
      this.setState({
        [name]: value,
      });
    }
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

  redirectToElectionHome = () => {
    this.props.history.push("/dashboard/election");
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
      this.setState({ formIsSubmitting: true }, () => {
        axios.defaults.withCredentials = true;
        let form = new FormData();
        form.append("name", this.state.electionName);
        form.append("start_date", this.state.startDate);
        form.append("end_date", this.state.endDate);
        axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
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
                if (res.data.field === "electionName") {
                  this.showAlert(
                    "Invalid Election Name",
                    "The election name you entered is not valid, it must be at least 3 words long"
                  );
                } else if (res.data.field === "startDate")
                  this.showAlert(
                    "Invalid Start Date",
                    "The start date you entered is not valid"
                  );
                else if (res.data.field === "endDate")
                  this.showAlert(
                    "Invalid End Date",
                    "The end date you entered is not valid"
                  );
                else if (res.data.field === "smallStartDate")
                  this.showAlert(
                    "Invalid Start Date",
                    "The start date of an election must be set to at least an hour from now"
                  );
                else if (res.data.field === "smallEndDate")
                  this.showAlert(
                    "Invalid End Date",
                    "The end date of an election must be at least one hour ahead of the start date of an election"
                  );
                else if (res.data.field === "pastEndDate")
                  this.showAlert(
                    "Invalid End Date",
                    "The end date must be set to the future"
                  );
                else if (res.data.field === "invalidDates")
                  this.showAlert(
                    "Invalid Dates",
                    "The dates you entered are invalid"
                  );
              } else if (res.data.exists === true)
                this.props.history.push("/dashboard/election");
              else if (res.data.completed === true)
                this.showAlert(
                  "Success!",
                  "Election created successfully",
                  "success",
                  this.redirectToElectionHome
                );
            }
          })
          .catch(res =>
            fireAjaxErrorAlert(this, res.request.status, this.handleSubmit)
          );
      });
    }
  };

  closeElectionAlreadyExistsModal = () => {
    this.setState({ showElectionAlreadyExistsModal: false });
  };

  redirectToManage = () => {
    this.props.history.push("/dashboard/election");
  };


  render() {
    return (
      <>
        <CreateElectionFormView
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          onChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          election={this.props.election}
          userManager={this._userManager}
          closeErrorModal={this.closeErrorModal}
          closeElectionAlreadyExistsModal={this.closeElectionAlreadyExistsModal}
          redirectToManage={this.redirectToManage}
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default CreateElectionFormController;
