import React, { Component } from "react";
import axios from "axios";

import EditCandidateForm from "components/forms/candidates/edit";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class EditCandidateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      candidate: null,
      parties: null,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.match.params.id}/edit/init`,
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
            candidate: res.data.candidate,
            parties: res.data.parties,
          });
        }
      })
      .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <>
        <EditCandidateForm
          {...this.props}
          updateUser={this.props.updateUser}
          {...this.state}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default EditCandidateRoute;
