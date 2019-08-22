import React, { Component } from "react";
import axios from "axios";

import SingleVoterRouteView from "./SingleVoterRouteView";

class SingleVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/${this.props.match.params.id}`,
      {
        method: "get"
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          voter: res.data.voter
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <SingleVoterRouteView {...this.state} {...this.props} />;
  }
}

export default SingleVoterRoute;
