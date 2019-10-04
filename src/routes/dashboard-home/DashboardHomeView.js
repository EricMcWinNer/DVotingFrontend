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
import voter from "assets/img/icons/voter.png";

function DashboardHomeView(props) {
  const userManager = props.userManager;
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
                number={props.voters.count}
                subtitle={`Last Created ${props.voters.lastCreated}`}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalCandidates}
                title={"Total Candidates"}
                number={props.candidates.count}
                subtitle={`Last Created ${props.candidates.lastCreated}`}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalParties}
                title={"Total Parties"}
                number={props.parties.count}
                subtitle={`Last Created ${props.parties.lastCreated}`}
              />
            </Col>
            <Col md={3}>
              <AnalyticCard
                icon={totalOfficers}
                title={"Polling Officers"}
                number={props.officers.count}
                subtitle={`Last Created ${props.officers.lastCreated}`}
              />
            </Col>
          </Row>
          <Row className={"rowMargin"}>
            {props.election.status === "pending" ||
              (props.election.status === "ongoing" && (
                <Col md={6}>
                  <CountdownTimer
                    updateDashboard={props.updateDashboard}
                    election={props.election}
                  />
                </Col>
              ))}
            {userManager.isOfficer() && (
              <Col md={3}>
                <AnalyticCard
                  icon={voter}
                  title={"Voters Registered"}
                  number={props.officer_info.total_voters_registered}
                  subtitle={`${props.officer_info.total_voters_registered_today} voters registered today`}
                />
              </Col>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default DashboardHomeView;
