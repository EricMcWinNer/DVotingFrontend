import React, { Component } from "react";
import axios from "axios";

import ForwardVoteRouteView from "./ForwardVoteRouteView";
import UserManager from "security/UserManager";

class ForwardVoteRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      selectedParty: "",
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

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
