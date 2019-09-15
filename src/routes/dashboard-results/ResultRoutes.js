import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import ResultsHome from "./dashboard-results-home";

class ResultRoutes extends Component {
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
          path={`${this.props.match.path}`}
          render={props => <ResultsHome user={user} {...props} />}
        />
      </Switch>
    );
  }
}

export default ResultRoutes;
