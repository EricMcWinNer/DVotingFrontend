import React, { Component } from "react";
import RegisterOfficialRouteView from "./RegisterOfficialRouteView";
import axios from "axios";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import FullScreenLoader from "components/loaders/fullscreen";
import ErrorAlert from "components/error-alert";

class RegisterOfficialRoute extends Component {
  
  constructor(props) {
    super(props);
    this.state = { ...initialAjaxAlertState, componentIsLoading: true };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${process.env.REACT_APP_API_PATH}/api/web/auth/validate-web-app-session`
      )
      .then(res => {
        if (res.data.isSessionValid === true)
          this.props.history.push("/dashboard");
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  signInRedirect = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        {this.state.componentIsLoading ? (
          <FullScreenLoader />
        ) : (
          <RegisterOfficialRouteView signInRedirect={this.signInRedirect} />
        )}
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default RegisterOfficialRoute;
