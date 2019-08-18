import React, { Component } from "react";

import DashboardPartyRouteView from "./DashboardPartyRouteView";

class DashboardPartyRoute extends Component {
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
    return <DashboardPartyRouteView {...this.state} {...this.props} />;
  }
}

export default DashboardPartyRoute;
