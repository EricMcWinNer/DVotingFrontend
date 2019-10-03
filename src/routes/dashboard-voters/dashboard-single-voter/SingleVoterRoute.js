import React, { Component } from "react";
import axios from "axios";

import VoterProfile from "components/dashboard/voter-profile";
import UserManager from "security/UserManager";

class SingleVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null,
      officer: null,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.initializeRoute();
  }

  initializeRoute = () => {
    if (this._mounted) {
      this.setState({ componentIsLoading: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/${this.props.match.params.id}`,
        {
          method: "get",
        }
      ).then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            voter: res.data.voter,
            officer: res.data.officer,
          });
        }
      });
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.initializeRoute();
    }
  }

  render() {
    return (
      <VoterProfile
        userManager={this._userManager}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default SingleVoterRoute;
