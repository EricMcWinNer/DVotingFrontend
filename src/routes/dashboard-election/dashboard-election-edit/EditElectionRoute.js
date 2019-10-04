import React, { Component } from "react";
import axios from "axios";

import EditElectionForm from "components/forms/election/edit";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class EditElectionRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      componentIsLoading: true,
      ...initialAjaxAlertState,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
      method: "get",
    })
      .then(res => {
        if (res.data.isSessionValid === false)
          this.props.history.push("/login");
        else {
          this.setState({
            election: res.data.election,
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
        <EditElectionForm
          {...this.state}
          udpateUser={this.props.updateUser}
          {...this.props}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default EditElectionRoute;
