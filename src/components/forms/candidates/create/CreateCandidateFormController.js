import React, { Component } from "react";
import axios from "axios";

import CreateCandidateFormView from "./CreateCandidateFormView";
import UserManager from "security/UserManager";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import SweetAlert from "react-bootstrap-sweetalert";

class CreateCandidateFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParty: "",
      selectedPartyLogo: "",
      candidatePictureFile: null,
      role: "",
      formSubmitting: false,
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
      ...initialAjaxAlertState
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  updateCampaignPicture = picture => {
    this.setState({ candidatePictureFile: picture });
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

  redirectToCandidates = () => {
    this.props.history.push("/dashboard/candidates");
  };

  redirectToElection = () => {
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

  handlePartyChange = e => {
    let { value } = e.target;
    if (value !== "") {
      const partyObject = this.props.parties.find(party => party.id == value);
      this.setState({
        selectedParty: partyObject.id,
        selectedPartyLogo: partyObject.logo,
      });
    } else {
      this.setState({ selectedParty: "", selectedPartyLogo: "" });
    }
  };

  handleSubmit = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true }, () => {
        axios.defaults.withCredentials = true;
        let form = new FormData();
        form.append("user_id", this.props.prospectiveCandidate.id);
        form.append("party_id", this.state.selectedParty);
        form.append("role", this.state.role);
        form.append("candidate_picture", this.state.candidatePictureFile);
        axios(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.prospectiveCandidate.id}/create`,
          {
            method: "post",
            data: form,
          }
        )
          .then(res => {
            if (res.data.isSessionValid === false)
              this.props.history.push("/login");
            else {
              this.setState({
                formIsSubmitting: false,
              });
              if (res.data.isValid === false) {
                if (res.data.field === "candidate_picture")
                  this.showAlert(
                    "Invalid Candidate Picture",
                    "The campaign picture you uploaded is not valid"
                  );
                else if (res.data.field === "invalidRole")
                  this.showAlert(
                    "Invalid Campaign Position",
                    "Select a valid campaigning role"
                  );
              } else if (res.data.completed === false) {
                if (res.data.err === "officialCantBeCandidate")
                  this.showAlert(
                    "User has already been assigned a role",
                    "Users who electoral officials or polling officers cannot be candidates",
                    "error",
                    this.redirectToCandidates
                  );
                else if (res.data.err === "alreadyCandidate") {
                  this.showAlert(
                    "User already an Candidate",
                    "This user is already a candidate. You will be redirected to the candidate list",
                    "error",
                    this.redirectToCandidates
                  );
                } else if (res.data.err === "noPendingElection")
                  this.showAlert(
                    "No Pending Election",
                    "A candidate can only be created when there is a pending election",
                    "error",
                    this.redirectToElection
                  );
                else if (res.data.err === "partyNotExist")
                  this.showAlert(
                    "Party Does Not Exist",
                    "Please select a valid party"
                  );
                else if (res.data.err === "notOfAge")
                  this.showAlert(
                    "User too young",
                    "A presidential/vice-presidential candidate must be at least 35 years old. You will be directed to the candidate list",
                    "error",
                    this.redirectToCandidates
                  );
                else if (res.data.err === "candidateConflictingRole")
                  this.showAlert(
                    "Conflicting Candidate Position",
                    "Two candidates cannot have the same position in the same party in the same election"
                  );
              } else if (res.data.completed === true)
                this.showAlert(
                  "Success!",
                  "Candidate created successfully",
                  "success",
                  this.redirectToCandidates
                );
            }
          })
          .catch(res => fireAjaxErrorAlert(this, res.request.status, this.handleSubmit));
      });
    }
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

  render() {
    return (
      <>
        <CreateCandidateFormView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handlePartyChange={this.handlePartyChange}
          updateCampaignPicture={this.updateCampaignPicture}
          userManager={this._userManager}
          closeErrorModal={this.closeErrorModal}
          {...this.state}
          {...this.props}
        />
        {this.state.showAjaxAlert && (
          <SweetAlert
            type={this.state.ajaxAlertType}
            allowEscape
            closeOnClickOutside
            title={this.state.ajaxAlertTitle}
            onConfirm={
              (typeof this.state.ajaxAlertCallback).toLowerCase() === "function"
                ? this.state.ajaxAlertCallback
                : this.state.closeAjaxAlert
            }
            onCancel={this.state.closeAjaxAlert}
            showCancel={this.state.ajaxShowCancel}
            confirmBtnText={this.state.ajaxConfirmText ? this.state.ajaxConfirmText : "Ok"}
            cancelBtnText={this.state.ajaxCancelText ? this.state.ajaxCancelText : "Cancel"}
          >
            <span className="cartogothic">{this.state.ajaxAlertMessage}</span>
          </SweetAlert>
        )}
      </>
    );
  }
}

export default CreateCandidateFormController;
