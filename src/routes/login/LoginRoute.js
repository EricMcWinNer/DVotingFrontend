import React, { Component } from "react";
import axios from "axios";

import SessionManager from "security/SessionManager";
import LoginRouteView from "./LoginRouteView";

class LoginRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      componentIsLoading: true
    };
  }

  componentDidMount() {
    this._mounted = true;
    SessionManager.isUserSignedIn().then(res => {
      this.setState(
        {
          loggedIn: res.data.isValid == "true"
        },
        () => {
          if (res.data.isValid == "true") this.props.history.push("/dashboard");
          else this.setState({ componentIsLoading: false });
        }
      );
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  redirectSignedInUser = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <LoginRouteView
        componentIsLoading={this.state.componentIsLoading}
        redirectSignedInUser={this.redirectSignedInUser}
      />
    );
  }
}

export default LoginRoute;
