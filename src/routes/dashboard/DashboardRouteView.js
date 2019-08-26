import React from "react";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import "./index.sass";
import FullScreenLoader from "components/loaders/fullscreen";
import SideBar from "components/dashboard/sidebar";
import NavBar from "components/dashboard/navbar";
import DashboardHome from "routes/dashboard-home";
import ElectionRouteContainer from "routes/dashboard-election";
import PartyRouteContainer from "routes/dashboard-party";
import VotersRouteContainer from "routes/dashboard-voters";
import CandidatesContainer from "routes/dashboard-candidates";
import OfficialHomeContainer from "routes/dashboard-officials";
import RestrictedRoute from "components/routes/restricted-route";

function DashBoardRouteView(props) {
  const nameArray = props.componentIsLoading ? [] : props.user.name.split(" ");
  const lastName = nameArray[0];
  const firstName = nameArray[1];
  const lastAndFirstName = nameArray[0] + " " + nameArray[1];
  const user = props.user;
  return props.componentIsLoading ? (
    <FullScreenLoader />
  ) : (
    <Container className={"vpHeight"} fluid>
      <div id={"dashBoardView"}>
        <Helmet>
          <title>
            {process.env.REACT_APP_NAME} | {firstName}'s Dashboard
          </title>
        </Helmet>
        <div className="main">
          <SideBar
            name={lastAndFirstName}
            location={props.location.pathname}
            user={props.user}
          />
          <div className={"mainContent"}>
            <NavBar logOut={props.logOut} className={"sticky-top"} />
            <div className="dashboardContent">
              <Switch>
                <Route
                  path={`${props.match.path}`}
                  exact
                  render={props => <DashboardHome user={user} {...props} />}
                />
                <Route
                  path={`${props.match.path}/election`}
                  render={props => (
                    <ElectionRouteContainer user={user} {...props} />
                  )}
                />
                <Route
                  path={`${props.match.path}/party`}
                  render={props => (
                    <PartyRouteContainer user={user} {...props} />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/voters`}
                  isAuthorized={props.user.roles.includes("official")}
                  render={props => (
                    <VotersRouteContainer user={user} {...props} />
                  )}
                />
                <Route
                  path={`${props.match.path}/candidates`}
                  render={props => (
                    <CandidatesContainer user={user} {...props} />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/officials`}
                  isAuthorized={props.user.roles.includes("official")}
                  render={props => (
                    <OfficialHomeContainer user={user} {...props} />
                  )}
                />
              </Switch>
            </div>
            <div />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoardRouteView;
