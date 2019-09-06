import React, { Component } from "react";
import axios from "axios";

import CreatePinRouteView from "components/forms/pins/create";

class CreatePinRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      noOfPins: 0,
      typeOfPins: "",
      creating: false,
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertType: "",
      alertCallBack: null,
    };
  }

  componentDidMount() {
    this._mounted = true;
    const type = this.props.match.params.type;
    if (type === "officials" || type === "officers")
      this.setState({ typeOfPins: type });
  }

  createPromise = url => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(url);
      req.then(
        res => {
          if (res.data.isSessionValid == "false") {
            this.props.history.push("/login");
          } else {
            this.setState({
              creating: false,
            });
          }
          return res;
        },
        err => {
          this.setState({
            creating: false,
          });
        }
      );
      return req;
    }
  };

  handleCreate = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({
        creating: true,
      });
      this.createPromise(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/pins/${this.state.typeOfPins}/${this.state.noOfPins}/make`
      )
        .then(res => {
          this.showAlert(
            "Success!",
            "Pins generated successfully",
            "success",
            this.closeErrorModal
          );
        })
        .catch(res => {
          if (res.request.status === 404) {
            this.showAlert(
              "Error!",
              "The values you selected were invalid",
              "error",
              this.closeErrorModal
            );
          }
        });
    }
  };

  showAlert = (
    errorTitle,
    errorMessage,
    alertType = "warning",
    alertCallBack = null
  ) => {
    this.setState({
      showErrorAlert: true,
      errorTitle,
      errorMessage,
      alertType,
      alertCallBack,
    });
  };

  closeErrorModal = () => {
    this.setState({
      showErrorAlert: false,
      errorTitle: "",
      errorMessage: "",
      alertCallBack: null,
    });
  };

  handleChange = e => {
    let { name, value, type, tagName } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      tagName.toLowerCase() === "select" ||
      type === "date"
    ) {
      this.setState({
        [name]: value,
      });
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <CreatePinRouteView
        handleChange={this.handleChange}
        handleCreate={this.handleCreate}
        closeErrorModal={this.closeErrorModal}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default CreatePinRoute;