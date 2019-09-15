import React, { Component } from "react";
import ResultsHomeRouteView from "./ResultsHomeRouteView";
import UserManager from "security/UserManager";

class ResultsHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      election: null,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //DO SOMETHING
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <ResultsHomeRouteView
        userManger={this._userManager}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ResultsHomeRoute;
