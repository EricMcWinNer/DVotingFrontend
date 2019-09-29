import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "routes/error-pages/404";
import Login from "./default";

class LoginRoutes extends Component {
  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <Switch>
        <Route exact path={"/login"} render={props => <Login {...props} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default LoginRoutes;
