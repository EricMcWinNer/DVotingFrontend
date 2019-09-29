import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NotFound from "routes/error-pages/404";
import Login from "routes/login";
import Register from "routes/register";
import Dashboard from "routes/dashboard";

/*
  TODO - SETUP AN ALERT FOR WHEN USER NEWLY REGISTERS

 */

class EntryPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newlyRegistered: false,
    };
  }

  setUserAsNewlyRegistered = () => {
    this.setState({ newlyRegistered: true }, () => {
      setTimeout(() => {
        this.setState({ newlyRegistered: false });
      }, 10000);
    });
  };

  render() {
    return (
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path={"/"} component={Dashboard} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default EntryPoint;
