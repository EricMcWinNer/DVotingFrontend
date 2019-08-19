import React from "react";
import { Route, Switch } from "react-router-dom";

import RestrictedRoute from "components/routes/restricted-route";
import ElectionHomeRoute from "./dashboard-election-home";
import CreateElectionRoute from "./dashboard-election-create";
import EditElectionRoute from "./dashboard-election-edit";
import DeleteElectionRoute from "./dashboard-election-delete";
import ElectionRouteContainer from "routes/dashboard-election/ElectionRoute";

function ElectionRouteView(props) {
  const user = props.user;
  return (
    <div>
      <Switch>
        <Route
          path={`${props.match.path}`}
          exact
          render={props => <ElectionHomeRoute user={user} {...props} />}
        />
        <RestrictedRoute
          path={`${props.match.path}/create`}
          exact
          isAuthorized={props.user.roles.includes("official")}
          component={CreateElectionRoute}
        />
        <RestrictedRoute
          path={`${props.match.path}/edit`}
          exact
          isAuthorized={props.user.roles.includes("official")}
          component={EditElectionRoute}
        />
        <RestrictedRoute
          path={`${props.match.path}/delete`}
          exact
          isAuthorized={props.user.roles.includes("official")}
          component={DeleteElectionRoute}
        />
      </Switch>
    </div>
  );
}

export default ElectionRouteView;
