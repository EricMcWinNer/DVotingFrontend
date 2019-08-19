import React, { Component } from "react";
import axios from "axios";

import PartyHomeRouteView from "./PartyHomeRouteView";

class PartyHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      parties: null
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/party/all`, {
      method: "get"
    }).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          parties: res.data.parties
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <PartyHomeRouteView {...this.state} {...this.props} />;
  }
}

export default PartyHomeRoute;
