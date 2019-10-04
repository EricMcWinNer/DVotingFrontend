import React, { Component } from "react";
import axios from "axios";

import CreateCandidateForm from "components/forms/candidates/create";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class CreateCandidateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      election: null,
      prospectiveCandidate: null,
      parties: null,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.match.params.id}/create/initialize`,
      {
        method: "get",
      }
    )
      .then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            election: res.data.election,
            prospectiveCandidate: res.data.user,
            parties: res.data.parties,
            componentIsLoading: false,
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
        <CreateCandidateForm
          updateUser={this.props.updateUser}
          {...this.state}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default CreateCandidateRoute;
