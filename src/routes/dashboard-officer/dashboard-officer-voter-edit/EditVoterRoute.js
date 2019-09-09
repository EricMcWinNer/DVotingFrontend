import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import EditVoterRouteView from "./EditVoterRouteView";

class EditVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null,
    };
    this._id = this.props.match.params.id;
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/voters/${this._id}/read`
      )
      .then(res => {
        this.setState({
          componentIsLoading: false,
          voter: res.data.voter === null ? null : res.data.voter.voter,
        });
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <EditVoterRouteView {...this.state} {...this.props} />;
  }
}

export default EditVoterRoute;
