import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import VoteHome from "./dashboard-vote-home";
import ForwardVote from "./dashboard-vote-forward";

class VoteRoutes extends Component {
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
          render={props => <VoteHome user={user} {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/:id/forward`}
          render={props => <ForwardVote user={user} {...props} />}
        />
      </Switch>
    );
  }
}

export default VoteRoutes;
