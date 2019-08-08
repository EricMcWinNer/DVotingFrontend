import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./dashboard-home.sass";
import AnalyticCard from "components/dashboard/analytic-card";
import CountdownTimer from "components/dashboard/countdown-timer";

function DashboardHomeView() {
  const analyticCards = [];
  for (let i = 0; i < 4; i++) {
    analyticCards.push(
      <Col key={i} md={3}>
        <AnalyticCard key={i}/>
      </Col>
    );
  }
  return (
    <div id={"dashboardHomeView"}>
      <Container>
        <Row>
          {analyticCards}
        </Row>
        <Row className={"rowMargin"}>
          <Col md={6}>
            <CountdownTimer/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardHomeView;