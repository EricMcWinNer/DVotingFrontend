import React, { Component } from "react";
import RegisterOfficerRouteView from "./RegisterOfficerRouteView";

class RegisterOfficerRoute extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  signInRedirect = () => {
    this.props.history.push("/login");
  };

  render() {
    return <RegisterOfficerRouteView signInRedirect={this.signInRedirect} />;
  }
}

export default RegisterOfficerRoute;
