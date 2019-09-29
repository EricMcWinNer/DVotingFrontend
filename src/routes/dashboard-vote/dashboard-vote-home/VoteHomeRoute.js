import React, { Component } from "react";
import axios from "axios";
import UserManager from "security/UserManager";
import VoteHomeRouteView from "./VoteHomeRouteView";

class VoteHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      parties: null,
      componentIsLoading: true,
      selectedParty: "",
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
      voted: false,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.getElection().then(res => {
      if (this.state.election !== null) this.getParties();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  getElection = () => {
    axios.defaults.withCredentials = true;
    const req = axios
      .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
      .then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            election: res.data.election,
            componentIsLoading: res.data.election !== null,
          });
        }
      });
    return req;
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

  closeErrorModal = () => {
    this.setState({
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertCallBack: null,
    });
  };

  forwardVote(id) {
    this.props.history.push(`/dashboard/vote/${id}/forward`);
  }

  triggerConfirmAlert = party => {
    this.showAlert(
      "Are you sure?",
      `You are about to vote for ${party.name} (${party.acronym}). This action cannot be undone!`,
      "info",
      () => this.forwardVote(party.id)
    );
  };

  getParties = () => {
    this.setState({ componentIsLoading: true });
    axios.defaults.withCredentials = true;
    const req = axios
      .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/vote`)
      .then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            parties: res.data.parties,
            voted: res.data.voted,
            componentIsLoading: false,
          });
        }
      });
    return req;
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  handlePartyCardClick = (e, partyId) => {
    if (this._mounted) {
      this.setState({
        selectedParty: this.state.selectedParty === partyId ? "" : partyId,
      });
    }
  };

  render() {
    return (
      <VoteHomeRouteView
        handlePartyCardClick={this.handlePartyCardClick}
        {...this.state}
        userManager={this._userManager}
        closeErrorModal={this.closeErrorModal}
        triggerConfirmAlert={this.triggerConfirmAlert}
      />
    );
  }
}

export default VoteHomeRoute;
