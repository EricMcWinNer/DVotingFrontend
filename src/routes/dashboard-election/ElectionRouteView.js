import React from "react";
import { Route, Switch } from "react-router-dom";

import ElectionHomeRoute from "./dashboard-election-home";
import CreateElectionRoute from "./dashboard-election-create";
import EditElectionRoute from "./dashboard-election-edit";
import DeleteElectionRoute from "./dashboard-election-delete";

function ElectionRouteView(props) {
  return (
    <div>
      <Switch>
        <Route
          path={`${props.match.path}`}
          exact
          component={ElectionHomeRoute}
        />
        <Route
          path={`${props.match.path}/create`}
          exact
          component={CreateElectionRoute}
        />
        <Route
          path={`${props.match.path}/edit`}
          exact
          component={EditElectionRoute}
        />
        <Route
          path={`${props.match.path}/delete`}
          exact
          component={DeleteElectionRoute}
        />
      </Switch>
    </div>
  );
}

export default ElectionRouteView;
