import React, { Component } from "react";
import axios from "axios";

import DashboardRouteView from "./DashboardRouteView";

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/home/user`, {
      method: "get",
    }).then(res => {
      if (res.data.isSessionValid == "true") {
        this.setState({
          user: res.data.user,
          componentIsLoading: false,
        });
      } else this.props.history.push("/login");
    });
  }

  updateUser = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/home/user`
      );
      req.then(res => {
        if (res.data.isSessionValid == "true") {
          this.setState({
            user: res.data.user,
          });
        } else this.props.history.push("/login");
      });
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  logOut = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/web/auth/logout`, {
      method: "get",
    }).then(res => {
      if (res.data.success == "true") {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    console.log(typeof this.updateUser, "dashboardroute");
    return (
      <DashboardRouteView
        componentIsLoading={this.state.componentIsLoading}
        user={this.state.user}
        logOut={this.logOut}
        {...this.props}
        updateUser={this.updateUser}
      />
    );
  }
}

export default DashboardRoute;
