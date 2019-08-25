import React, { Component } from "react";
import axios from "axios";

import CreateCandidateFormView from "./CreateCandidateFormView";

class CreateCandidateFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
              if (res.data.err === "userNotExist") {
                alert(
                  "The user you are trying to make candidate does not exist. You will be redirected to select one that exists"
                );
                this.props.history.push("/dashboard/candidates/create");
              } else if (res.data.err === "officialCantBeCandidate")
                alert("An official cannot be a candidate");
              else if (res.data.err === "alreadyCandidate") {
                alert(
                  "This user is already a candidate. You will be redirected to the candidate list"
                );
                this.props.history.push("/dashboard/candidates");
              } else if (res.data.err === "noPendingElection")
                alert(
                  "A candidate can only be created when there is a pending election"
                );
              else if (res.data.err === "partyNotExist")
                alert("Please select a valid party");
              else if (res.data.err === "notOfAge")
                alert(
                  "A presidential/vice-presidential candidate must be at least 35 years old"
                );
              else if (res.data.err === "candidateConflictingRole")
                alert(
                  "Two candidates cannot have the same position in the same party in the same election"
                );
            } else if (res.data.completed === true)
              this.props.history.push("/dashboard/candidates");
          }
        });
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
        [name]: value
      });
    }
  };

  render() {
    return (
      <CreateCandidateFormView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handlePartyChange={this.handlePartyChange}
        updateCampaignPicture={this.updateCampaignPicture}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default CreateCandidateFormController;
