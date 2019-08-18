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
      componentIsLoading: true,
      finalizing: false
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

  finalizeElection = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ finalizing: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/election/finalize`,
        {
          method: "get"
        }
      ).then(res => {
        this.setState({ finalizing: false });
        if (res.data.isSessionValid != "true") {
          this.props.history.push("/login");
        } else {
          if (res.data.exists === false)
            this.props.history.push("/dashboard/election");
          else if (res.data.completed === true) {
            alert(
              "Election was finalized successfully. You can start another election after confirming this."
            );
            this.props.history.push("/dashboard/election");
          }
        }
      });
    }
  };

  render() {
    return (
      <ElectionHomeRouteView
        componentIsLoading={this.state.componentIsLoading}
        finalizeElection={this.finalizeElection}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ElectionHomeRoute;
