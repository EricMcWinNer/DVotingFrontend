import React, { Component } from "react";

import DashboardHomeView from "routes/dashboard-home/DashboardHomeView";
import axios from "axios";
import UserManager from "security/UserManager";

class DashboardHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      voters: null,
      parties: null,
      candidates: null,
      officers: null,
      componentIsLoading: true,
      officer_info: null,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.updateDashboard();
    this._dashboardInterval = setInterval(this.updateDashboard, 1000 * 60);
  }

  updateDashboard = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/home`)
        .then(res => {
          if (res.data.isSessionValid === true) {
            this.setState({
              election: res.data.election.original.election,
              voters: res.data.voters,
              parties: res.data.parties,
              candidates: res.data.candidates,
              officers: res.data.officers,
              componentIsLoading: false,
              officer_info: res.data.officer_info,
            });
          } else this.props.history.push("/login");
        });
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this._dashboardInterval);
  }

  render() {
    return (
      <DashboardHomeView
        userManager={this._userManager}
        updateDashboard={this.updateDashboard}
        {...this.state}
      />
    );
  }
}

export default DashboardHome;
