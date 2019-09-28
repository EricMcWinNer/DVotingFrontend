import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import VoterHome from "routes/dashboard-voters/dashboard-voter-home";
import SingleVoter from "routes/dashboard-voters/dashboard-single-voter";
import NotFound from "components/cards/not-found-card";

class VoterRoutes extends Component {
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
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:id`}
          exact
          render={props => <SingleVoter user={this.props.user} {...props} />}
        />
        <Route
          path={this.props.match.path}
          exact
          render={props => <VoterHome user={this.props.user} {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default VoterRoutes;
