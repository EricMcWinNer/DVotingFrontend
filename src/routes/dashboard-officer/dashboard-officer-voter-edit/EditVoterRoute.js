import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import EditVoterRouteView from "./EditVoterRouteView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class EditVoterRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voter: null,
      ...initialAjaxAlertState,
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
        if (res.data.isSessionValid === false)
          this.props.history.push("/login");
        else
          this.setState({
            componentIsLoading: false,
            voter: res.data.voter === null ? null : res.data.voter.voter,
          });
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <>
        <EditVoterRouteView {...this.state} {...this.props} />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default EditVoterRoute;
