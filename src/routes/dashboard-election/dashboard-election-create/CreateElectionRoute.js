import React, { Component } from "react";
import axios from "axios";

import CreateElectionForm from "components/forms/election/create";

class CreateElectionRoute extends Component {
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
      if (res.data.isSessionValid === true) {
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
    return <CreateElectionForm {...this.state} {...this.props} />;
  }
}

export default CreateElectionRoute;
