import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import OfficialHomeRouteView from "./OfficialHomeRouteView";

class OfficialHomeRoute extends Component {
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
    return <OfficialHomeRouteView {...this.props} {...this.state} />;
  }
}

export default OfficialHomeRoute;
