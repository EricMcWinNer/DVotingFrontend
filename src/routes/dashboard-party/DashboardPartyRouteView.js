import React from "react";
import { Switch, Route } from "react-router-dom";

import PartyHomeRoute from "./dashboard-party-home";
import PartyCreateRoute from "./dashboard-party-create";
import PartyEditRoute from "./dashboard-party-edit";
import PartyDeleteRoute from "./dashboard-party-delete";

function DashboardPartyRouteView(props) {
  return (
    <Switch>
      <Route path={`${props.match.path}`} exact component={PartyHomeRoute} />
      <Route
        path={`${props.match.path}/create`}
        exact
        component={PartyCreateRoute}
      />
      <Route path={`${props.match.path}/:id/edit`} component={PartyEditRoute} />
      <Route
        path={`${props.match.path}/:id/delete`}
        component={PartyDeleteRoute}
      />
    </Switch>
  );
}

export default DashboardPartyRouteView;
