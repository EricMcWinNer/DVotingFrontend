import React, { Component } from "react";
import axios from "axios";

import ElectionHomeRouteView from "routes/dashboard-election/dashboard-election-home/ElectionHomeRouteView";

class ElectionHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      string_dates: "",
      created_by: "",
      componentIsLoading: true
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
      method: "get"
    }).then(res => {
      if (res.data.isSessionValid == "true") {
        this.setState({
          loggedIn: res.data.isSessionValid == "true",
          election: res.data.election,
          created_by: res.data.created_by,
          string_dates: res.data.string_dates,
          componentIsLoading: false
        });
      } else this.props.history.push("/login");
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <ElectionHomeRouteView
        componentIsLoading={this.state.componentIsLoading}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ElectionHomeRoute;
