import React, { Component } from "react";
import axios from "axios";

import VoterProfile from "components/dashboard/voter-profile";
import UserManager from "security/UserManager";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class ReadVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null,
      forbidden: false,
      ...initialAjaxAlertState,
    };
    this._id = this.props.match.params.id;
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/voters/${this._id}/read`
      )
      .then(res => {
        if (res.data.isSessionValid === false)
          this.props.history.push("/login");
        else
          this.setState({
            componentIsLoading: false,
            voter: res.data.voter === null ? null : res.data.voter.voter,
          });
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <>
        <VoterProfile
          userManager={this._userManager}
          officerView
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default ReadVoterRoute;
