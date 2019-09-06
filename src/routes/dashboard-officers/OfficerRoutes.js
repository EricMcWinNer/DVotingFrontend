import React, { Component } from "react";
import { Switch } from "react-router-dom";

import OfficerHomeRoute from "./dashboard-officers-home";
import CreateOfficerRoute from "./dashboard-officers-create";
import ConfirmOfficerCreationRoute from "./dashboard-officers-create-confirm";
import DeleteOfficerRoute from "./dashboard-officers-delete";
import NewVoterRoute from "./dashboard-officers-voters-new";
import RestrictedRoute from "components/routes/restricted-route";
import UserManager from "security/UserManager";

class OfficerRoutes extends Component {
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
          isAuthorized={UserManager.isOfficer(user)}
          exact
          path={`${this.props.match.path}/voters/new`}
          render={props => <NewVoterRoute user={user} {...props} />}
        />
      </Switch>
    );
  }
}

export default OfficerRoutes;
