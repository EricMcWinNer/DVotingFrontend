import React, { Component } from "react";
import axios from "axios";

import DashboardRouteView from "./DashboardRouteView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      user: {},
      notifications: null,
      responsiveSidebar: true,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/home/user`, {
      method: "get",
    })
      .then(res => {
        if (res.data.isSessionValid === false)
          this.props.history.push("/login");
        else {
          this.setState({
            user: res.data.user,
            componentIsLoading: false,
          });
        }
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
    this.notificationsKickStarter();
    this.setState({ responsiveSidebar: window.innerWidth < 1370 });
    window.addEventListener("resize", this.handleResize);
  }

  //Fires each the time the window is resized to handle sidebar responsiveness
  handleResize = () => {
    this.setState({ responsiveSidebar: window.innerWidth < 1370 });
  };

  //Method that fetches/refreshes notifications
  getNotifications = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/user/notifications`
        )
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            if (this._mounted)
              this.setState({ notifications: res.data.notifications });
          }
        });
      return req;
    }
  };

  //Fires each time the notifications are closed to mark all notifications as read
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
          if (res.data.isSessionValid === false) {
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

  //This method gets the notifications the first time and every
  //5 seconds later to keep notifications up to date
  notificationsKickStarter = () => {
    if (this._mounted) {
      this.getNotifications();
      this._notifications = setInterval(() => {
        this.getNotifications();
      }, 1000 * 10);
    }
  };

  //This method is fired during special events to keep the user object up to date
  //and ensure the user has authorization to access restricted routes
  updateUser = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/home/user`
      );
      req
        .then(res => {
          if (res.data.isSessionValid === false)
            this.props.history.push("/login");
          else {
            this.setState({
              user: res.data.user,
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.updateUser)
        );
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this._notifications);
    window.removeEventListener("resize", this.handleResize);
  }

  logOut = e => {
    if (e !== undefined) e.preventDefault();
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/web/auth/logout`, {
      method: "get",
    })
      .then(res => {
        if (res.data.success === true) {
          this.props.history.push("/login");
        }
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, this.logOut));
  };

  render() {
    return (
      <>
        <DashboardRouteView
          logOut={this.logOut}
          {...this.state}
          {...this.props}
          updateUser={this.updateUser}
          setNotificationsAsRead={this.setNotificationsAsRead}
          closeAjaxAlert={this.closeAjaxAlert}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default DashboardRoute;
