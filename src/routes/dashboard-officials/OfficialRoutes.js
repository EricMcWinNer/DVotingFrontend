import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import OfficialHomeRoute from "./dashboard-officials-home";
import CreateOfficialRoute from "./dashboard-officials-create";
import ConfirmOfficialCreateRoute from "./dashboard-officials-create-confirm";
import NotFound from "components/cards/not-found-card";

class OfficialRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const user = this.props.user;
    const updateUser = this.props.updateUser;
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}/`}
          render={props => (
            <OfficialHomeRoute user={user} updateUser={updateUser} {...props} />
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/create`}
          render={props => (
            <CreateOfficialRoute
              updateUser={updateUser}
              user={user}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/:id/create`}
          render={props => (
            <ConfirmOfficialCreateRoute
              updateUser={updateUser}
              user={user}
              {...props}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default OfficialRoutes;
