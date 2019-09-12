import React, { Component } from "react";
import UserManager from "security/UserManager";
import axios from "axios";

import ElectionHomeRouteView from "routes/dashboard-election/dashboard-election-home/ElectionHomeRouteView";

class ElectionHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      string_dates: "",
      created_by: "",
      componentIsLoading: true,
      finalizing: false,
      fireDeleteModal: false,
      fireDeleteSuccessModal: false,
      electionIsDeleting: false,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.initializeRoute();
    this._updateRoute = setInterval(
      () => this.initializeRoute(false),
      1000 * 60
    );
  }

  initializeRoute = (affectLoader = true) => {
    if (this._mounted) {
      if (affectLoader) this.setState({ componentIsLoading: true });
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
        .then(res => {
          if (res.data.isSessionValid == "true") {
            this.setState({
              loggedIn: res.data.isSessionValid == "true",
              election: res.data.election,
              created_by: res.data.created_by,
              string_dates: res.data.string_dates,
              componentIsLoading: false,
            });
          } else this.props.history.push("/login");
        });
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this._updateRoute);
  }

  finalizeElection = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ finalizing: true });
      axios.defaults.withCredentials = true;
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/election/finalize`,
        {
          method: "get",
        }
      ).then(res => {
        this.setState({ finalizing: false });
        if (res.data.isSessionValid != "true") {
          this.props.history.push("/login");
        } else {
          if (res.data.exists === false)
            this.props.history.push("/dashboard/election");
          else if (res.data.completed === true) {
            alert(
              "Election was finalized successfully. You can start another election after confirming this."
            );
            this.props.history.push("/dashboard/election");
          }
        }
      });
    }
  };

  showDeleteModal = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ fireDeleteModal: true });
    }
  };

  closeDeleteModal = () => {
    if (this._mounted) this.setState({ fireDeleteModal: false });
  };

  deleteElection = () => {
    if (this._mounted) {
      this.setState(
        {
          electionIsDeleting: true,
        },
        () => {
          axios.defaults.withCredentials = true;
          axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
            method: "delete",
          }).then(res => {
            if (res.data.isSessionValid == "false")
              this.props.history.push("/login");
            else {
              this.setState({
                fireDeleteModal: false,
              });
              if (res.data.exists === false)
                this.props.history.push("/dashboard/election");
              else if (res.data.completed === true) {
                this.setState({
                  fireDeleteModal: false,
                  fireDeleteSuccessModal: true,
                });
              }
            }
          });
        }
      );
    }
  };

  handleModalConfirmation = () => {
    if (this._mounted) {
      this.setState({ fireDeleteSuccessModal: false }, this.initializeRoute);
    }
  };

  render() {
    return (
      <ElectionHomeRouteView
        componentIsLoading={this.state.componentIsLoading}
        finalizeElection={this.finalizeElection}
        userManager={this._userManager}
        closeDeleteModal={this.closeDeleteModal}
        showDeleteModal={this.showDeleteModal}
        deleteElection={this.deleteElection}
        handleModalConfirmation={this.handleModalConfirmation}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ElectionHomeRoute;
