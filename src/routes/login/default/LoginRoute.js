import React, { Component } from "react";

import SessionManager from "security/SessionManager";
import LoginRouteView from "./LoginRouteView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class LoginRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    SessionManager.isUserSignedIn().then(res => {
      if (res.data.isSessionValid === true)
        this.props.history.push("/dashboard");
      else this.setState({ componentIsLoading: false });
    })
    .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  redirectSignedInUser = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <>
        <LoginRouteView
          componentIsLoading={this.state.componentIsLoading}
          redirectSignedInUser={this.redirectSignedInUser}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default LoginRoute;
