import React, { Component } from "react";

import CreatePartyFormView from "components/forms/party/create";

class DashboardPartyCreateRoute extends Component {
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
    return <CreatePartyFormView {...this.props} />;
  }
}

export default DashboardPartyCreateRoute;