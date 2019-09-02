import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CandidatesHomeRoute from "./dashboard-candidates-home";
import RestrictedRoute from "components/routes/restricted-route";
import SelectNewCandidateRoute from "./dashboard-candidates-select";
import CreateNewCandidateRoute from "./dashboard-candidates-create";
import DeleteCandidateRoute from "./dashboard-candidates-delete";
import EditCandidateRoute from "./dashboard-candidates-edit";
import UserManager from "security/UserManager";

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
    const user = this.props.user;
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.path}
          render={props => <CandidatesHomeRoute user={user} {...props} />}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/create`}
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <SelectNewCandidateRoute user={user} {...props} />}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/:id/create`}
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <CreateNewCandidateRoute user={user} {...props} />}
        />
        <RestrictedRoute
          path={`${this.props.match.path}/:id/edit`}
          exact
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <EditCandidateRoute user={user} {...props} />}
        />
        <RestrictedRoute
          exact
          path={`${this.props.match.path}/:id/delete`}
          isAuthorized={UserManager.isOfficial(user)}
          render={props => <DeleteCandidateRoute user={user} {...props} />}
        />
      </Switch>
    );
  }
}

export default CandidatesRoutes;
