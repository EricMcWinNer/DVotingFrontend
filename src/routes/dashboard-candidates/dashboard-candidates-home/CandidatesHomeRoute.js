import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CandidatesHomeRouteView from "./CandidatesHomeRouteView";

class CandidatesHomeRoute extends Component {
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
    return <CandidatesHomeRouteView />;
  }
}

export default CandidatesHomeRoute;
