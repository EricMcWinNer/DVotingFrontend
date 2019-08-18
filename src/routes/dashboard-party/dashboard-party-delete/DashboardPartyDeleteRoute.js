import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import PartyDeleteView from "./DashboardPartyDeleteRouteView";

class DashboardPartyDeleteRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      party: null,
      deleting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}`,
      {
        method: "get"
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          party: res.data.party
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleDelete = e => {
    if (this._mounted) {
      this.setState({ deleting: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}`,
        {
          method: "delete"
        }
      ).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            deleting: false
          });
          if (res.data.deleted === true) {
            alert("Political party deleted successfully");
            this.props.history.push("/dashboard/party");
          }
        }
      });
    }
  };

  render() {
    return (
      <PartyDeleteView
        handleDelete={this.handleDelete}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default DashboardPartyDeleteRoute;
