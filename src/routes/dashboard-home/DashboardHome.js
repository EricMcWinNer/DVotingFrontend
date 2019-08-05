import React, { Component } from "react";

import DashboardHomeView from "./DashboardHomeView";

class DashboardHome extends Component {
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
    return <DashboardHomeView />;
  }
}

export default DashboardHome;