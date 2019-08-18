import React, { Component } from "react";

import ElectionRouteView from "./ElectionRouteView";

class ElectionRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <ElectionRouteView {...this.props} />;
  }
}

export default ElectionRoute;
