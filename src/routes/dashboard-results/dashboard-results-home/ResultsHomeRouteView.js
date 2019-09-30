import React, { useState } from "react";
import Helmet from "react-helmet";
import DataTable from "react-data-table-component";
import "./index.sass";
import BaseCard from "components/cards/base-card";
import statistics from "assets/img/icons/results.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnalyticCard from "components/cards/analytic-card";
import NoElectionCard from "components/cards/no-election-card";
import NoOngoingElectionCard from "components/cards/only-ongoing-election-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import { dateStringParser, sentenceCase } from "utils/helpers";
import mostVotes from "assets/img/icons/raise-hand.png";
import totalVotes from "assets/img/icons/ballot.png";
import votesTableIcon from "assets/img/icons/started.png";
import { resultsModel } from "utils/tablemodels";
import { VictoryPie, VictoryTheme, VictoryContainer } from "victory";
import LinkButton from "components/buttons/react-router-link-button";

function ResultHomeRouteView(props) {
  const [stateRadius, setStateRadius] = useState(0);
  let voteTableData, states, lgas;
  if (!props.componentIsLoading && props.noResults !== true) {
    if (!props.votesIsLoading) {
      voteTableData = props.votesData.map((party, index) => ({
        serial: index + 1,
        ...party,
      }));
    }
    states = props.states.map((state, index) => (
      <option value={state.state_id} key={index}>
        {state.name}
      </option>
    ));
    lgas = props.lgas.map((lga, index) => (
      <option value={lga.lga_id} key={index}>
        {lga.name}
      </option>
    ));
  }
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.election === null ? (
    <NoElectionCard />
  ) : props.election.status === "ongoing" ||
    props.election.status === "completed" ? (
    props.noResults !== true ? (
      <Row id={"results"}>
        <Helmet>
          <title>{process.env.REACT_APP_NAME} | Election Results</title>
        </Helmet>
        <Col md={12}>
          <BaseCard>
            <div className="title clearfix o-auto">
              <div className="float-left">
                <img
                  src={statistics}
                  alt="Results"
                  className={"title-icon small"}
                />
              </div>
              <div className="float-left">
                <p className={"title"}>
                  {sentenceCase("election real-time results")}
                </p>
              </div>
            </div>
            <p className="subtitle poppins">
              In this section you can see the real-time results of the ongoing
              election
            </p>
            <div className={"results-container"}>
              <div>
                <AnalyticCard
                  largerIcon
                  icon={totalVotes}
                  title={"Total Votes Cast"}
                  number={props.totalVotes}
                  subtitle={`Last vote cast ${dateStringParser(
                    props.lastVoteCast
                  )}`}
                />
              </div>
              <div>
                <AnalyticCard
                  largerIcon
                  icon={mostVotes}
                  title={"Total Parties"}
                  number={`${props.totalParties}`}
                  subtitle={
                    <>
                      <i className="fas fa-person-booth" />{" "}
                      {`${props.numberOfParties} parties received votes out of ${props.totalParties}`}
                    </>
                  }
                  noClock
                />
              </div>
              <div>
                <AnalyticCard
                  largerIcon
                  icon={`${process.env.REACT_APP_API_PATH}/storage/${props.mostVotedParty.logo}`}
                  title={"Most Voted Party"}
                  number={`${props.mostVotedParty.textifiedTotal}`}
                  noClock
                  subtitle={
                    <>
                      <i className="fas fa-sort-amount-up" />{" "}
                      {`About ${props.mostVotedParty.percentage} of all votes cast`}
                    </>
                  }
                />
              </div>
              <div>
                <AnalyticCard
                  largerIcon
                  icon={`${process.env.REACT_APP_API_PATH}/storage/${props.leastVotedParty.logo}`}
                  title={"Least Voted Party"}
                  number={`${props.leastVotedParty.textifiedTotal}`}
                  noClock
                  subtitle={
                    <>
                      <i className="fas fa-sort-amount-down" />
                      {`About ${props.leastVotedParty.percentage} of all votes cast`}
                    </>
                  }
                />
              </div>
            </div>
            <div className={"charts-grid"}>
              <div className={"pie-chart-container"}>
                <BaseCard id={"pie"} className={"chart-container"}>
                  <p className="title cartogothic">Distribution of Votes</p>
                  <VictoryPie
                    containerComponent={
                      <VictoryContainer padding={{ top: 0 }} />
                    }
                    padding={{ left: 70, right: 70, top: 0, bottom: 40 }}
                    innerRadius={({ datum }) =>
                      Math.abs(80 - parseInt(datum.percent))
                    }
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onMouseEnter: () => {
                            return [
                              {
                                target: "data",
                                mutation: ({ radius }) => {
                                  setStateRadius(radius);
                                  return {
                                    style: { fill: "#13110e" },
                                    radius: radius + 10,
                                  };
                                },
                              },
                              {
                                target: "labels",
                                mutation: () => {
                                  return {
                                    style: {
                                      fontWeight: "bold",
                                      fontSize: 11,
                                    },
                                  };
                                },
                              },
                            ];
                          },
                          onMouseLeave: () => {
                            return [
                              {
                                target: "data",
                                mutation: () => {
                                  return { radius: stateRadius };
                                },
                              },
                              {
                                target: "labels",
                                mutation: () => {
                                  return {
                                    style: {
                                      fontWeight: "400",
                                      fill: "rgb(69, 90, 100)",
                                      stroke: "transparent",
                                      strokeWidth: "0px",
                                      fontSize: 11,
                                    },
                                  };
                                },
                              },
                            ];
                          },
                        },
                      },
                    ]}
                    style={{
                      labels: {
                        fontSize: 12,
                        stroke: "#212121",
                        fontFamily: "Poppins",
                      },
                    }}
                    data={props.pieData}
                    theme={VictoryTheme.material}
                  />
                  <p className={"sub-title text-muted poppins"}>
                    <i className="fas fa-chart-pie" />
                    {props.totalParties <= 4 ? (
                      <span>
                        Showing results for {props.totalParties} parties
                      </span>
                    ) : (
                      <span>Showing results for top 3 parties</span>
                    )}
                  </p>
                </BaseCard>
              </div>
            </div>

            <BaseCard className={"margin-30"}>
              <div className="title clearfix o-auto">
                <div className="float-left">
                  <img
                    src={votesTableIcon}
                    alt="Results"
                    className={"title-icon small"}
                  />
                </div>
                <div className="float-left">
                  <p className={"title"}>
                    {sentenceCase(
                      `votes of all parties${
                        props.selectStateObject === null
                          ? ""
                          : " in " + props.selectStateObject.name
                      }${
                        props.selectedLgaObject === null
                          ? ""
                          : ` in ${props.selectedLgaObject.name}`
                      }${
                        props.selectStateObject === null &&
                        props.selectedLgaObject === null
                          ? " in Nigeria"
                          : ""
                      }`
                    )}
                  </p>
                </div>
              </div>
              <p className="subtitle poppins">
                In this section you can see the votes of all the parties
                participating in this election. You can also view the number of
                votes in each state and local government.
              </p>

              <div className={"searchTools"}>
                <ul className={"o-auto clearfix d-flex"}>
                  <li className={"ml-auto"}>
                    <label htmlFor={"filterState"}>Filter by State:</label>
                    <select
                      name={"filterState"}
                      id={"filterState"}
                      className={"filterVoters custom-select"}
                      value={props.selectedState}
                      onChange={e => props.handleFilterSelect(e)}
                    >
                      <option value={""}>All States</option>
                      {states}
                    </select>
                  </li>
                  <li>
                    <label htmlFor={"filterLGA"}>Filter by LGA:</label>
                    <select
                      name={"filterLGA"}
                      id={"filterLGA"}
                      className={"filterVoters custom-select"}
                      value={props.selectedLga}
                      onChange={e => props.handleFilterSelect(e)}
                    >
                      <option value={""}>
                        {props.selectedState === ""
                          ? "All LGAs (Please select a state first)"
                          : props.lgaIsLoading
                          ? "Loading...please wait"
                          : "All LGAs"}
                      </option>
                      {lgas}
                    </select>
                  </li>
                </ul>
              </div>
              <div className={"DataTableContainer mt-3"}>
                <DataTable
                  noHeader
                  striped
                  columns={resultsModel}
                  data={voteTableData}
                />
                {props.tableLoading && (
                  <div className="DataTableLoader">
                    <SubRouteLoader />
                  </div>
                )}
              </div>
            </BaseCard>
          </BaseCard>
        </Col>
      </Row>
    ) : (
      <BaseCard>
        <div className="title clearfix o-auto">
          <div className="float-left">
            <img
              src={statistics}
              alt="Results"
              className={"title-icon small"}
            />
          </div>
          <div className="float-left">
            <p className={"title"}>
              {sentenceCase("election real-time results")}
            </p>
          </div>
        </div>
        <p className="subtitle poppins">
          In this section you can see the real-time results of the ongoing
          election
        </p>
        <h4 className={"cartogothic mt-3 mb-3"}>
          There are no results because no one has voted yet. Click the link
          below to vote
        </h4>
        <LinkButton to={"/dashboard/vote"} medium className={"confirm-background"}>
          <i className={"fas fa-vote-yea"} />
          Vote Now
        </LinkButton>
      </BaseCard>
    )
  ) : (
    <NoOngoingElectionCard />
  );
}

export default ResultHomeRouteView;
