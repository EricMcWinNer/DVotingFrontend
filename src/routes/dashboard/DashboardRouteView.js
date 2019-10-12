import React, { useState } from "react";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import "./index.sass";
import FullScreenLoader from "components/loaders/fullscreen";
import SideBar from "components/dashboard/sidebar";
import ResponsiveSideBar from "components/dashboard/responsive-sidebar";
import NavBar from "components/dashboard/navbar";
import DashboardHome from "routes/dashboard-home";
import ElectionRouteContainer from "routes/dashboard-election";
import PartyRouteContainer from "routes/dashboard-party";
import VotersRouteContainer from "routes/dashboard-voters";
import CandidatesContainer from "routes/dashboard-candidates";
import OfficialHomeContainer from "routes/dashboard-officials";
import OfficersHomeContainer from "routes/dashboard-officers";
import OfficerContainer from "routes/dashboard-officer";
import PinHomeContainer from "routes/dashboard-pins";
import VoteContainer from "routes/dashboard-vote";
import ResultsContainer from "routes/dashboard-results";
import RestrictedRoute from "components/routes/restricted-route";
import UserManager from "security/UserManager";
import NotFound from "components/cards/not-found-card";

function DashBoardRouteView(props) {
  const mainContent = React.createRef();
  const modalRef = React.createRef();
  const [clickCount, setClickCount] = useState(0);
  const nameArray = props.componentIsLoading ? [] : props.user.name.split(" ");
  const firstName = nameArray[1];
  const lastAndFirstName = nameArray[0] + " " + nameArray[1];
  const user = props.componentIsLoading ? null : props.user;
  const updateUser = props.componentIsLoading ? null : props.updateUser;
  const logOut = props.logOut;
  return props.componentIsLoading ? (
    <FullScreenLoader />
  ) : (
    <Container className={"vpHeight"} fluid>
      <div
        id={"mainModal"}
        ref={modalRef}
        className={`modal-sidebar-overlay${
          clickCount % 2 !== 0 ? " show" : ""
        }`}
        onClick={e => {
          const { tagName, id } = e.target;
          if (id === modalRef.current.id || tagName.toLowerCase() === "a")
            setClickCount(clickCount + 1);
        }}
      >
        {props.responsiveSidebar && (
          <SideBar
            responsive
            clickCount={clickCount}
            setClickCount={setClickCount}
            name={lastAndFirstName}
            location={props.location.pathname}
            user={props.user}
            election={
              props.notifications === null ? null : props.notifications.election
            }
          />
        )}
      </div>
      <div id={"dashBoardView"}>
        <Helmet>
          <title>
            {process.env.REACT_APP_NAME} | {firstName}'s Dashboard
          </title>
        </Helmet>
        <div className="main">
          {props.responsiveSidebar ? (
            <ResponsiveSideBar
              name={lastAndFirstName}
              mainContent={mainContent}
              location={props.location.pathname}
              user={props.user}
              clickCount={clickCount}
              setClickCount={setClickCount}
              election={
                props.notifications === null
                  ? null
                  : props.notifications.election
              }
            />
          ) : (
            <SideBar
              name={lastAndFirstName}
              location={props.location.pathname}
              user={props.user}
              election={
                props.notifications === null
                  ? null
                  : props.notifications.election
              }
            />
          )}

          <div
            ref={mainContent}
            className={`mainContent${
              props.responsiveSidebar ? " responsive" : ""
            }${clickCount % 2 !== 0 ? " slideOut" : ""}`}
          >
            <NavBar
              logOut={props.logOut}
              notifications={props.notifications}
              className={"sticky-top"}
              setNotificationsAsRead={props.setNotificationsAsRead}
            />
            <div className="dashboardContent">
              <Switch>
                <Route
                  path={`${props.match.path}`}
                  exact
                  render={props => (
                    <DashboardHome
                      user={user}
                      updateUser={updateUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${props.match.path}/election`}
                  render={props => (
                    <ElectionRouteContainer
                      user={user}
                      updateUser={updateUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${props.match.path}/party`}
                  render={props => (
                    <PartyRouteContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/voters`}
                  isAuthorized={UserManager.isOfficial(user)}
                  render={props => (
                    <VotersRouteContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${props.match.path}/candidates`}
                  render={props => (
                    <CandidatesContainer
                      user={user}
                      updateUser={updateUser}
                      {...props}
                    />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/officials`}
                  isAuthorized={UserManager.isOfficial(user)}
                  render={props => (
                    <OfficialHomeContainer
                      user={user}
                      updateUser={updateUser}
                      {...props}
                    />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/officers`}
                  isAuthorized={UserManager.isOfficial(user)}
                  render={props => (
                    <OfficersHomeContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/officer`}
                  isAuthorized={UserManager.isOfficer(user)}
                  render={props => (
                    <OfficerContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <RestrictedRoute
                  path={`${props.match.path}/pins`}
                  isAuthorized={UserManager.isOfficial(user)}
                  render={props => (
                    <PinHomeContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${props.match.path}/vote`}
                  render={props => (
                    <VoteContainer
                      updateUser={updateUser}
                      user={user}
                      logOut={logOut}
                      {...props}
                    />
                  )}
                />
                <Route
                  path={`${props.match.path}/results`}
                  render={props => (
                    <ResultsContainer
                      updateUser={updateUser}
                      user={user}
                      {...props}
                    />
                  )}
                />
                <Route component={NotFound} />
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
