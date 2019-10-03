import React, { Component } from "react";
import axios from "axios";

import VoterProfile from "components/dashboard/voter-profile";
import UserManager from "security/UserManager";

class ReadVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null,
      forbidden: false,
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
        if (res.data.isSessionValid === true)
          this.setState({
            componentIsLoading: false,
            voter: res.data.voter === null ? null : res.data.voter.voter,
          });
        else this.props.history.push("/login");
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <VoterProfile
        userManager={this._userManager}
        officerView
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default ReadVoterRoute;
