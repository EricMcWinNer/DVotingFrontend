import React, { Component } from "react";
import axios from "axios";

import DashboardRouteView from "./DashboardRouteView";

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      user: {},
      notifications: null,
      responsiveSidebar: true,
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
    this.notificationsKickStarter();
    this.setState({ responsiveSidebar: window.innerWidth < 1370 });
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ responsiveSidebar: window.innerWidth < 1370 });
  };

  getNotifications = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/user/notifications`
        )
        .then(res => {
          if (res.data.isSessionValid == "false") {
            this.props.history.push("/login");
          } else {
            const notifications = res.data.notifications;

            this.setState({ notifications: res.data.notifications });
          }
        });
      return req;
    }
  };

  setNotificationsAsRead = () => {
    if (
      this._mounted &&
      this.state.notifications.unreadNotificationsCount > 0
    ) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/user/notifications/readall`
        )
        .then(res => {
          if (res.data.isSessionValid == "false") {
            this.props.history.push("/login");
          } else {
            this.setState({
              notifications: res.data.notifications,
            });
          }
        });
      return req;
    }
  };

  notificationsKickStarter = () => {
    if (this._mounted) {
      this.getNotifications();
      this._notifications = setInterval(() => {
        this.getNotifications();
      }, 1000 * 15);
    }
  };

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
    clearInterval(this._notifications);
    window.removeEventListener("resize", this.handleResize);
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
    return (
      <DashboardRouteView
        logOut={this.logOut}
        {...this.state}
        {...this.props}
        updateUser={this.updateUser}
        setNotificationsAsRead={this.setNotificationsAsRead}
      />
    );
  }
}

export default DashboardRoute;
