import React from "react";
import { Switch, Route } from "react-router-dom";

import PartyHomeRoute from "./dashboard-party-home";
import PartyCreateRoute from "./dashboard-party-create";
import PartyEditRoute from "./dashboard-party-edit";
import PartyDeleteRoute from "./dashboard-party-delete";
import RestrictedRoute from "components/routes/restricted-route";
import ElectionHomeRoute from "routes/dashboard-election/dashboard-election-home";

function DashboardPartyRouteView(props) {
  const user = props.user;
  return (
    <Switch>
      <Route
        path={`${props.match.path}`}
        exact
        render={props => <PartyHomeRoute user={user} {...props} />}
      />
      <RestrictedRoute
        path={`${props.match.path}/create`}
        exact
        isAuthorized={props.user.roles.includes("official")}
        render={props => <PartyCreateRoute user={user} {...props} />}
      />
      <RestrictedRoute
        exact
        render={props => <PartyEditRoute user={user} {...props} />}
        isAuthorized={props.user.roles.includes("official")}
        path={`${props.match.path}/:id/edit`}
      />
      <RestrictedRoute
        exact
        path={`${props.match.path}/:id/delete`}
        isAuthorized={props.user.roles.includes("official")}
        render={props => <PartyDeleteRoute user={user} {...props} />}
      />
    </Switch>
  );
}

export default DashboardPartyRouteView;
