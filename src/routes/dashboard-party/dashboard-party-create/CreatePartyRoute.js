import React, { Component } from "react";

import CreatePartyForm from "components/forms/party/create";

class CreatePartyRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <CreatePartyForm {...this.props} />;
  }
}

export default CreatePartyRoute;
