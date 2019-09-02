import React, { Component } from "react";
import axios from "axios";

import DeleteCandidateRouteView from "./DeleteCandidateRouteView";

class DeleteCandidateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      candidate: null,
      deleting: false,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.match.params.id}`,
      {
        method: "get",
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          candidate: res.data.candidate,
        });
      }
    });
  }

  handleDelete = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ deleting: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${this.props.match.params.id}`,
        {
          method: "delete",
        }
      ).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            deleting: false,
          });
          if (res.data.completed === true) {
            alert("Candidate deleted successfully");
            this.props.history.push("/dashboard/candidates");
          }
        }
      });
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <DeleteCandidateRouteView
        handleDelete={this.handleDelete}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default DeleteCandidateRoute;
