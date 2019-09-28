import React, { Component } from "react";
import { Switch } from "react-router-dom";

import OfficerHomeRoute from "./dashboard-officers-home";
import CreateOfficerRoute from "./dashboard-officers-create";
import ConfirmOfficerCreationRoute from "./dashboard-officers-create-confirm";
import DeleteOfficerRoute from "./dashboard-officers-delete";
import ViewVotersRegistered from "./dashboard-officers-view-voters";
import RestrictedRoute from "components/routes/restricted-route";
import UserManager from "security/UserManager";
import NotFound from "components/cards/not-found-card";

class OfficersRoutes extends Component {
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
          render={props => <OfficerHomeRoute user={user} {...props} />}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/create`}
          render={props => <CreateOfficerRoute user={user} {...props} />}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/:id/create`}
          render={props => (
            <ConfirmOfficerCreationRoute user={user} {...props} />
          )}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/:id/delete`}
          render={props => <DeleteOfficerRoute user={user} {...props} />}
        />
        <RestrictedRoute
          isAuthorized={UserManager.isOfficial(user)}
          exact
          path={`${this.props.match.path}/:id/voters`}
          render={props => <ViewVotersRegistered user={user} {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default OfficersRoutes;
