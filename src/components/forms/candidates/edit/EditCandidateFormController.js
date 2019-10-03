import React, { Component } from "react";
import axios from "axios";

import UserManager from "security/UserManager";
import EditCandidateFormView from "./EditCandidateFormView";

class EditCandidateFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
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
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.candidate === null && this.props.candidate !== null) {
      this.setState({
        selectedParty: this.props.candidate.party_id,
        selectedPartyLogo: this.props.candidate.party.logo,
        role: this.props.candidate.role,
      });
    }
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

  handleSubmit = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true }, () => {
        axios.defaults.withCredentials = true;
        let form = new FormData();
        form.append("party_id", this.state.selectedParty);
        form.append("role", this.state.role);
        form.append("candidate_picture", this.state.candidatePictureFile);
        axios(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.candidate.id}/edit`,
          {
            method: "post",
            data: form,
          }
        ).then(res => {
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
              if (res.data.err === "candidateNotExist") {
                this.showAlert(
                  "Candidate does not exist",
                  "The candidate you are trying to edit does not exist, he/she has possibly already been deleted before",
                  "error",
                  this.redirectToCandidates
                );
                alert("The candidate you are trying to update does not exist");
                this.props.history.push("/dashboard/candidates/create");
              } else if (res.data.err === "noPendingElection") {
                this.showAlert(
                  "No Pending Election",
                  "A candidate can only be created or edited when there is a pending election",
                  "error",
                  this.redirectToCandidates
                );
              } else if (res.data.err === "partyNotExist")
                this.showAlert(
                  "Party Does Not Exist",
                  "Please select a valid party"
                );
              else if (res.data.err === "candidateConflictingRole")
                this.showAlert(
                  "Conflicting Candidate Position",
                  "Two candidates cannot have the same position in the same party in the same election"
                );
            } else if (res.data.completed === true) {
              this.showAlert(
                "Success!",
                "Candidate edited successfully",
                "success"
              );
            }
          }
        });
      });
    }
  };

  render() {
    return (
      <EditCandidateFormView
        handleChange={this.handleChange}
        handlePartyChange={this.handlePartyChange}
        updateCampaignPicture={this.updateCampaignPicture}
        handleSubmit={this.handleSubmit}
        userManager={this._userManager}
        closeErrorModal={this.closeErrorModal}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default EditCandidateFormController;
