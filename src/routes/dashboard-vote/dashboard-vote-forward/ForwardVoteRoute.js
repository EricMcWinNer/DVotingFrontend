import React, { Component } from "react";
import axios from "axios";

import ForwardVoteRouteView from "./ForwardVoteRouteView";
import UserManager from "security/UserManager";

class ForwardVoteRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      party: null,
      voted: false,
    };
    this._userManager = new UserManager(this.props.user);
    this._id = this.props.match.params.id;
  }

  componentDidMount() {
    this._mounted = true;
    this.checkVoter();
  }

  checkVoter = () => {
    axios.defaults.withCredentials = true;
    const req = axios
      .get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/vote/${this._id}/forward`
      )
      .then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            party: res.data.party,
            voted: res.data.voted,
          });
        }
      });
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <ForwardVoteRouteView userManager={this._userManager} {...this.state} />
    );
  }
}

export default ForwardVoteRoute;
