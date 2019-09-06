import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
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
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/dashboard"} component={Dashboard} />
      </Router>
    );
  }
}

export default EntryPoint;
