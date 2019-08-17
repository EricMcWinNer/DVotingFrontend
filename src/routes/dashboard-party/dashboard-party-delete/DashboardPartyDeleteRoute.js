import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import PartyDeleteView from "./DashboardPartyDeleteRouteView";

class DashboardPartyDeleteRoute extends Component {
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
    return <PartyDeleteView {...this.props} />;
  }
}

export default DashboardPartyDeleteRoute;
