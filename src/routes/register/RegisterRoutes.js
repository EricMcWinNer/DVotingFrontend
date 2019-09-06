import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RegisterOfficial from "./register-official";
import RegisterOfficer from "./register-officer";

class RegisterRoutes extends Component {
  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}/official`}
          render={props => <RegisterOfficial {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/officer`}
          render={props => <RegisterOfficer {...props} />}
        />
      </Switch>
    );
  }
}

export default RegisterRoutes;
