import React, { Component } from "react";
import axios from "axios";

import DashboardRouteView from "./DashboardRouteView";

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      componentIsLoading: true,
      user: {}
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/home/user`, {
      method: "get"
    }).then(res => {
      if (res.data.isSessionValid == "true") {
        this.setState({
          loggedIn: res.data.isSessionValid == "true",
          user: res.data.user,
          componentIsLoading: false
        });
      } else this.props.history.push("/login");
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  logOut = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/web/auth/logout`, {
      method: "get"
    }).then(res => {
      if (res.data.success == "true") {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <DashboardRouteView
        componentIsLoading={this.state.componentIsLoading}
        user={this.state.user}
        logOut={this.logOut}
        {...this.props}
      />
    );
  }
}

export default DashboardRoute;
