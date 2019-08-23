import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CandidatesHomeRoute from "./dashboard-candidates-home";

class CandidatesRoutes extends Component {
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
          exact
          path={this.props.match.path}
          render={props => (
            <CandidatesHomeRoute user={this.props.user} {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default CandidatesRoutes;
