import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "routes/dashboard-home/dashboard-home.sass";
import AnalyticCard from "components/cards/analytic-card";
import CountdownTimer from "components/dashboard/countdown-timer";
import totalVoters from "assets/img/icons/card1.png";
import totalCandidates from "assets/img/icons/totalcandidates.png";
import totalParties from "assets/img/icons/totalpoliticalparties.png";
import totalOfficers from "assets/img/icons/officer.png";
import SubRouteLoader from "components/loaders/dashboard-sub-route";

function DashboardHomeView(props) {
  return (
    <div id={"dashboardHomeView"}>
      {props.componentIsLoading ? (
        <SubRouteLoader />
      ) : (
        <Container>
          <Row>
            <Col md={3}>
              <AnalyticCard
                icon={totalVoters}
                title={"Total Voters"}
                number={"194K"}
                subtitle={"Last Created 14:00"}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalCandidates}
                title={"Total Candidates"}
                number={"84"}
                subtitle={"Last Created 14:00"}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalParties}
                title={"Total Parties"}
                number={"59"}
                subtitle={"Last Created 14:00"}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalOfficers}
                title={"Polling Officers"}
                number={"204"}
                subtitle={"Last Created 14:00"}
              />
            </Col>
          </Row>
          <Row className={"rowMargin"}>
            <Col md={6}>
              <CountdownTimer />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default DashboardHomeView;
