import React, { Component } from "react";
import axios from "axios";

import SessionManager from "security/SessionManager";

import DashboardRouteView from "./DashboardRouteView";

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    SessionManager.isUserSignedIn().then(res => {
      this.setState(
        {
          loggedIn: res.data.isValid == "true"
        },
        () => {
          if (res.data.isValid == "false") this.props.history.push("/login");
        }
      );
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  logOut = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/logout`, {
      method: "get"
    }).then(res => {
      if (res.data.success == "true") {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return <DashboardRouteView logOut={this.logOut} {...this.props} />;
  }
}

export default DashboardRoute;
