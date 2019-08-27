import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import OfficialHomeRoute from "./dashboard-officials-home";

class OfficialRoutes extends Component {
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
    const user = this.props.user;
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}/`}
          render={props => <OfficialHomeRoute user={user} {...props} />}
        />
      </Switch>
    );
  }
}

export default OfficialRoutes;
