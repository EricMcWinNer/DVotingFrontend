import React, { Component } from "react";
import axios from "axios";

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
      formSubmitting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.candidate === null && this.props.candidate !== null) {
      this.setState({
        selectedParty: this.props.candidate.party_id,
        selectedPartyLogo: this.props.candidate.party_logo,
        role: this.props.candidate.role
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  updateCampaignPicture = picture => {
    this.setState({ candidatePictureFile: picture });
  };

  handlePartyChange = e => {
    let { value } = e.target;
    if (value !== "") {
      const partyObject = this.props.parties.find(party => party.id == value);
      this.setState({
        selectedParty: partyObject.id,
        selectedPartyLogo: partyObject.logo
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
        [name]: value
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
            data: form
          }
        ).then(res => {
          if (res.data.isSessionValid == "false")
            this.props.history.push("/login");
          else {
            this.setState({
              formIsSubmitting: false
            });
            if (res.data.isValid === false) {
              if (res.data.field === "candidate_picture")
                alert("The campaign picture you uploaded is not valid");
              else if (res.data.field === "invalidRole")
                alert("Select a valid campaigning role");
            } else if (res.data.completed === false) {
              if (res.data.err === "candidateNotExist") {
                alert("The candidate you are trying to update does not exist");
                this.props.history.push("/dashboard/candidates/create");
              } else if (res.data.err === "noPendingElection") {
                alert(
                  "A candidate can only be created when there is a pending election. You will be redirected to the election management page"
                );
                this.props.history.push("/dashboard/election");
              } else if (res.data.err === "partyNotExist")
                alert("Please select a valid party");
              else if (res.data.err === "candidateConflictingRole")
                alert(
                  "Two candidates cannot have the same position in the same party in the same election"
                );
            } else if (res.data.completed === true) {
              alert("Candidate updated successfully");
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
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default EditCandidateFormController;
