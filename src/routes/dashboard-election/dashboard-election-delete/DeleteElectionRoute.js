import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import DeleteElectionRouteView from "./DeleteElectionRouteView";

class DeleteElectionRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      election: null,
      formIsSubmitting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
      method: "get"
    }).then(res => {
      if (res.data.isSessionValid == "true") {
        this.setState({
          election: res.data.election,
          componentIsLoading: false
        });
      } else this.props.history.push("/login");
    });
  }

  deleteElection = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState(
        {
          formIsSubmitting: true
        },
        () => {
          axios.defaults.withCredentials = true;
          axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
            method: "delete"
          }).then(res => {
            if (res.data.isSessionValid == "false")
              this.props.history.push("/login");
            else {
              this.setState({
                formIsSubmitting: false
              });
              if (res.data.exists === false)
                this.props.history.push("/dashboard/election");
              else if (res.data.completed === true) {
                alert("Election deleted successfully");
                this.props.history.push("/dashboard/election");
              }
            }
          });
        }
      );
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <DeleteElectionRouteView
        {...this.props}
        {...this.state}
        deleteElection={this.deleteElection}
      />
    );
  }
}

export default DeleteElectionRoute;
