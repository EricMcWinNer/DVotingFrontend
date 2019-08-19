import React from "react";
import LogoWithText from "components/logo/withtext/logo";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import { Route, Switch } from "react-router-dom";

import FullScreenLoader from "components/loaders/fullscreen";
import SideBar from "components/dashboard/sidebar";
import NavBar from "components/dashboard/navbar";
import DashboardHome from "routes/dashboard-home";
import ElectionRouteContainer from "routes/dashboard-election";
import PartyRouteContainer from "routes/dashboard-party";

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
