import React, { Component } from "react";

import NewVoterRouteView from "./NewVoterRouteView";

class NewVoterRoute extends Component {
  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <NewVoterRouteView {...this.props} />;
  }
}

export default NewVoterRoute;
