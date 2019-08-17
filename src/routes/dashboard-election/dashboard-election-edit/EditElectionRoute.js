import React, { Component } from "react";
import axios from "axios";

import EditElectionForm from "components/forms/election/edit";

class EditElectionRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: null,
      componentIsLoading: true
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

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <EditElectionForm {...this.state} {...this.props} />;
  }
}

export default EditElectionRoute;
