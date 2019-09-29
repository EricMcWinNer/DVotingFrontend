import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import UserManager from "security/UserManager";
import PinHomeRoute from "./dashboard-pins-home";
import CreatePinRoute from "./dashboard-pins-create";
import NotFound from "components/cards/not-found-card";

class PinRoutes extends Component {
  constructor(props) {
    super(props);
    this._userManager = new UserManager(props.user);
  }

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
          path={`${this.props.match.path}/`}
          render={props => (
            <PinHomeRoute userManager={this._userManager} {...props} />
          )}
        />
        <Route
          exact
          path={[
            `${this.props.match.path}/create`,
            `${this.props.match.path}/create/:type`,
          ]}
          render={props => (
            <CreatePinRoute userManager={this._userManager} {...props} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default PinRoutes;
