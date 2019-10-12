import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import VoteHome from "./dashboard-vote-home";
import ForwardVote from "./dashboard-vote-forward";
import NotFound from "components/cards/not-found-card";

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
          render={props => (
            <VoteHome
              user={user}
              updateUser={this.props.updateUser}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${this.props.match.path}/:id/forward`}
          render={props => (
            <ForwardVote
              user={user}
              updateUser={this.props.updateUser}
              logOut={this.props.logOut}
              {...props}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default VoteRoutes;
