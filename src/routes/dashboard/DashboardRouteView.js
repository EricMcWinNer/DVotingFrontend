import React from "react";
import LogoWithText from "components/logo/withtext/logo";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import SideBar from "components/dashboard/sidebar";
import NavBar from "components/dashboard/navbar";
import DashboardHome from "routes/dashboard-home";
import { Route } from "react-router-dom";

function DashBoardRouteView(props) {
  return (
    <Container className={"vpHeight"} fluid>
      <div id={"dashBoardView"}>
        <Helmet>
          <title>{process.env.REACT_APP_NAME} | Dashboard</title>
        </Helmet>
        <div className="main">
          <SideBar/>
          <div className={"mainContent"}>
            <NavBar className={"sticky-top"}/>
            <div className="dashboardContent">
              <Route path={`${props.match.path}`} exact component={DashboardHome}/>
            
            </div>
            <div/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoardRouteView;
