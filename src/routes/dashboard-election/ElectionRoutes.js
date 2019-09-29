import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import ElectionHomeRoute from "routes/dashboard-election/dashboard-election-home";
import RestrictedRoute from "components/routes/restricted-route";
import CreateElectionRoute from "routes/dashboard-election/dashboard-election-create";
import EditElectionRoute from "routes/dashboard-election/dashboard-election-edit";
import UserManager from "security/UserManager";
import NotFound from "components/cards/not-found-card";

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
    const user = this.props.user;
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          exact
          render={props => <ElectionHomeRoute user={user} {...props} />}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/create`}
          exact
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <CreateElectionRoute user={user} {...props} />}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/edit`}
          exact
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <EditElectionRoute user={user} {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default ElectionRoutes;
