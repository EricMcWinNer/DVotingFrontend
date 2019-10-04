import React, { Component } from "react";

import EditPartyForm from "components/forms/party/edit";

class EditPartyRoute extends Component {
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
    return <EditPartyForm updateUser={this.props.updateUser} {...this.props} />;
  }
}

export default EditPartyRoute;
