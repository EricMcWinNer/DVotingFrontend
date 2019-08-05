import React, { Component } from "react";
import DashboardRouteView from "./DashboardRouteView";

class DashboardRoute extends Component {
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
    return <DashboardRouteView {...this.props}/>;
  }
}

export default DashboardRoute;
