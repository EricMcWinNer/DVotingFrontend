import React, { Component } from "react";
import RegisterRouteView from "./RegisterRouteView";

class RegisterRoute extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  signInRedirect = () => {
    this.props.history.push("/login");
  };

  render() {
    return <RegisterRouteView signInRedirect={this.signInRedirect} />;
  }
}

export default RegisterRoute;
