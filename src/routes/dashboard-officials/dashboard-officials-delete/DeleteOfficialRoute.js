import React, { Component } from "react";
import axios from "axios";

import DeleteOfficialRouteView from "./DeleteOfficialRouteView";

class DeleteOfficialRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      official: null,
      deleting: false,
    };
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${this.props.match.params.id}`,
      {
        method: "get",
      }
    ).then(res => {
      if (res.data.isSessionValid === false) {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          official: res.data.official,
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleDelete = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ deleting: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${this.props.match.params.id}`,
        {
          method: "delete",
        }
      ).then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            deleting: false,
          });
          if (res.data.completed) {
            alert("Electoral Official deleted successfully");
            this.props.history.push("/dashboard/officials");
          } else {
            alert("An error occurred.");
            this.props.history.push("/dashboard/officials");
          }
        }
      });
    }
  };

  render() {
    return (
      <DeleteOfficialRouteView
        handleDelete={this.handleDelete}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default DeleteOfficialRoute;
