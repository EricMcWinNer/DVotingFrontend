import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import OfficerHomeRoute from "./dashboard-officers-home";
import CreateOfficerRoute from "./dashboard-officers-create";
import ConfirmOfficerCreationRoute from "./dashboard-officers-create-confirm";
import ViewVotersRegistered from "./dashboard-officers-view-voters";
import RestrictedRoute from "components/routes/restricted-route";
import UserManager from "security/UserManager";
import NotFound from "components/cards/not-found-card";

class OfficersRoutes extends Component {
  //eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const user = this.props.user;
    return (
      <Switch>
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}`}
          render={props => (
            <OfficerHomeRoute
              updateUser={this.props.updateUser}
              user={user}
              {...props}
            />
          )}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/create`}
          render={props => (
            <CreateOfficerRoute
              updateUser={this.props.updateUser}
              user={user}
              {...props}
            />
          )}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/:id/create`}
          render={props => (
            <ConfirmOfficerCreationRoute
              updateUser={this.props.updateUser}
              user={user}
              {...props}
            />
          )}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/:id/voters`}
          render={props => (
            <ViewVotersRegistered
              updateUser={this.props.updateUser}
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

export default OfficersRoutes;
