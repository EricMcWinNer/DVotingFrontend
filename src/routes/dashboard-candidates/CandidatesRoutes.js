import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CandidatesHomeRoute from "./dashboard-candidates-home";
import RestrictedRoute from "components/routes/restricted-route";
import SelectNewCandidateRoute from "./dashboard-candidates-select";
import CreateNewCandidateRoute from "./dashboard-candidates-create";
import DeleteCandidateRoute from "./dashboard-candidates-delete";
import EditCandidateRoute from "./dashboard-candidates-edit";

class CandidatesRoutes extends Component {
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
          exact
          path={this.props.match.path}
          render={props => (
            <CandidatesHomeRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/create`}
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <SelectNewCandidateRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/:id/create`}
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <CreateNewCandidateRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/:id/edit`}
          exact
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <EditCandidateRoute user={this.props.user} {...props} />
          )}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/:id/delete`}
          isAuthorized={this.props.user.roles.includes("official")}
          render={props => (
            <DeleteCandidateRoute user={this.props.user} {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default CandidatesRoutes;
