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
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/home`, {
      method: "get",
    }).then(res => {
      if (res.data.isSessionValid == "true") {
        this.setState({
          loggedIn: res.data.isSessionValid == "true",
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
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <DashboardHomeView userManager={this._userManager} {...this.state} />
    );
  }
}

export default DashboardHome;
