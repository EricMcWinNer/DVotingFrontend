import React, { Component } from "react";
import axios from "axios";
import UserManager from "security/UserManager";
import VoteHomeRouteView from "./VoteHomeRouteView";

class VoteHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      componentIsLoading: true,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.getElection();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  getElection = () => {
    axios.defaults.withCredentials = true;
    const req = axios
      .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
      .then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            election: res.data.election,
            componentIsLoading: false,
          });
        }
      });
    return req;
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <VoteHomeRouteView {...this.state} userManager={this._userManager} />
    );
  }
}

export default VoteHomeRoute;
