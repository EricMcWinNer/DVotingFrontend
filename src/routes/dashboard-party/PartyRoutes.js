import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PartyHomeRoute from "routes/dashboard-party/dashboard-party-home";
import RestrictedRoute from "components/routes/restricted-route";
import PartyCreateRoute from "routes/dashboard-party/dashboard-party-create/CreatePartyRoute";
import PartyEditRoute from "routes/dashboard-party/dashboard-party-edit/EditPartyRoute";
import UserManager from "security/UserManager";
import NotFound from "components/cards/not-found-card";

class PartyRoutes extends Component {
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
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          exact
          render={props => (
            <PartyHomeRoute
              user={user}
              updateUser={this.props.updateUser}
              {...props}
            />
          )}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/create`}
          exact
          isAuthorized={UserManager.isOfficial(user)}
          render={props => (
            <PartyCreateRoute
              user={user}
              updateUser={this.props.updateUser}
              {...props}
            />
          )}
        />
        <RestrictedRoute
          exact
          render={props => (
            <PartyEditRoute
              user={user}
              updateUser={this.props.updateUser}
              {...props}
            />
          )}
          isAuthorized={UserManager.isOfficial(user)}
          path={`${this.props.match.path}/:id/edit`}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default PartyRoutes;
