import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PartyHomeRoute from "routes/dashboard-party/dashboard-party-home";
import RestrictedRoute from "components/routes/restricted-route";
import PartyCreateRoute from "routes/dashboard-party/dashboard-party-create/CreatePartyRoute";
import PartyEditRoute from "routes/dashboard-party/dashboard-party-edit/EditPartyRoute";
import PartyDeleteRoute from "routes/dashboard-party/dashboard-party-delete/DeletePartyRoute";

class PartyRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true
    };
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
          path={`${this.props.match.path}`}
          exact
          render={props => <PartyHomeRoute user={this.props.user} {...props} />}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/create`}
          exact
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <PartyCreateRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          exact
          render={props => <PartyEditRoute user={this.props.user} {...props} />}
          isAuthorized={this.props.user.roles.includes("official")}
          path={`${this.props.match.path}/:id/edit`}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/:id/delete`}
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <PartyDeleteRoute user={this.props.user} {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default PartyRoutes;
