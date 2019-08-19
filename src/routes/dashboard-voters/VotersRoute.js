import React, { Component } from "react";
import axios from "axios";

import VotersRouteView from "./VotersRouteView";

class VotersRoute extends Component {
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
    return <VotersRouteView {...this.state} />;
  }
}

export default VotersRoute;
