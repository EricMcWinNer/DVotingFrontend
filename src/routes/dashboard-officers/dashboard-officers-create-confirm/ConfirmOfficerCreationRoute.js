import React, { Component } from "react";
import axios from "axios";

import ConfirmOfficerCreationRouteView from "./ConfirmOfficerCreationRouteView";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class ConfirmOfficerCreationRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      creating: false,
      prospectiveOfficer: null,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}/create/confirm`,
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
            prospectiveOfficer: res.data.user,
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
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}`,
        {
          method: "post",
        }
      )
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState({
              creating: false,
            });
            if (res.data.completed === true) {
              alert("Polling Officer created successfully");
              this.props.history.push("/dashboard/officers");
            } else {
              alert("An error occured");
              this.props.history.push("/dashboard/officers");
            }
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, null, false)
        );
    }
  };

  render() {
    return (
      <>
        <ConfirmOfficerCreationRouteView
          handleCreate={this.handleCreate}
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default ConfirmOfficerCreationRoute;
