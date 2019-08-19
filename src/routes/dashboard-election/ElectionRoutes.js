import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import ElectionHomeRoute from "routes/dashboard-election/dashboard-election-home";
import RestrictedRoute from "components/routes/restricted-route";
import CreateElectionRoute from "routes/dashboard-election/dashboard-election-create";
import EditElectionRoute from "routes/dashboard-election/dashboard-election-edit";
import DeleteElectionRoute from "routes/dashboard-election/dashboard-election-delete";

class ElectionRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          render={props => (
            <ElectionHomeRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/create`}
          exact
          isAuthorized={this.props.user.roles.includes("official")}
          component={CreateElectionRoute}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/edit`}
          exact
          isAuthorized={this.props.user.roles.includes("official")}
          component={EditElectionRoute}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/delete`}
          exact
          isAuthorized={this.props.user.roles.includes("official")}
          component={DeleteElectionRoute}
        />
      </Switch>
    );
  }
}

export default ElectionRoutes;
