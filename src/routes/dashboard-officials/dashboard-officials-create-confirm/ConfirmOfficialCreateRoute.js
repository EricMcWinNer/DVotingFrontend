import React, { Component } from "react";
import axios from "axios";

import ConfirmOfficialCreateRouteView from "./ConfirmOfficialCreateRouteView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class ConfirmOfficialCreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      creating: false,
      prospectiveOfficial: null,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${this.props.match.params.id}/create/confirm`,
      {
        method: "get",
      }
    )
      .then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            prospectiveOfficial: res.data.user,
          });
        }
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleCreate = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ creating: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${this.props.match.params.id}/create`,
        {
          method: "post",
        }
      ).then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            creating: false,
          });
          if (res.data.completed) {
            alert("Elector Official created successfully");
            this.props.history.push("/dashboard/officials");
          } else {
            alert("An error occured");
            this.props.history.push("/dashboard/officials");
          }
        }
      });
    }
  };

  render() {
    return (
      <>
        <ConfirmOfficialCreateRouteView
          handleCreate={this.handleCreate}
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default ConfirmOfficialCreateRoute;
