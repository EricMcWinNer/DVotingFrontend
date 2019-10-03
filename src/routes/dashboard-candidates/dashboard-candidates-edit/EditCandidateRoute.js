import React, { Component } from "react";
import axios from "axios";

import EditCandidateForm from "components/forms/candidates/edit";

class EditCandidateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      candidate: null,
      parties: null
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.match.params.id}/edit/init`,
      {
        method: "get"
      }
    ).then(res => {
      if (res.data.isSessionValid === false) {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          candidate: res.data.candidate,
          parties: res.data.parties
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <EditCandidateForm {...this.props} {...this.state} />;
  }
}

export default EditCandidateRoute;
