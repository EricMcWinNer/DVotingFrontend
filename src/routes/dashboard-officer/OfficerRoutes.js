import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RegisterVoter from "./dashboard-officer-register-voter";
import ViewRegisteredVoters from "./dashboard-officer-voters-view";
import ReadVoterInfo from "./dashboard-officer-voters-read";
import EditVoterInfo from "./dashboard-officer-voter-edit";
import NotFound from "components/cards/not-found-card";

class OfficersRoutes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const user = this.props.user;
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}/register/voter`}
          render={props => <RegisterVoter user={user} {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/voters`}
          render={props => <ViewRegisteredVoters user={user} {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/voters/:id`}
          render={props => <ReadVoterInfo user={user} {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/voters/:id/edit`}
          render={props => <EditVoterInfo user={user} {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default OfficersRoutes;
