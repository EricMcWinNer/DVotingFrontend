import React, { Component } from "react";
import axios from "axios";
import ResultsHomeRouteView from "./ResultsHomeRouteView";
import UserManager from "security/UserManager";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class ResultsHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      noResults: false,
      election: null,
      totalVotes: 0,
      lastVoteCast: "",
      mostVotedParty: null,
      leastVotedParty: null,
      numberOfParties: 0,
      totalParties: 0,
      pieChartIsLoading: true,
      areaIsLoading: true,
      votesIsLoading: true,
      currentPage: 0,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
      lgaIsLoading: false,
      states: null,
      lgas: [],
      selectedState: "",
      selectedLga: "",
      selectStateObject: null,
      selectedLgaObject: null,
      timeLeft: null,
      duration: null,
      tableTotal: 0,
      tableURL: `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes`,
      filtered: false,
      ...initialAjaxAlertState,
    };
    this._userManager = new UserManager(this.props.user);
  }

  pieData = [];

  votesData = [];

  areaData = [];

  componentDidMount() {
    this._mounted = true;
    this.getElection();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //DO SOMETHING
  }

  /*
    Runs all the methods necessary to display the results
  */
  getResults = () => {
    if (this._mounted) this.initializeRoute().then(this.getVotesData);
  };

  /*
    Similar to notifications kickstarter this method gets results once and gets it again
    every 5 seconds to keep the result's values up to date.
  */
  resultsKickstarter = () => {
    if (this._mounted) {
      this.getResults();
      this._results = setInterval(() => {
        this.updateResults();
      }, 1000 * 15);
    }
  };

  updateResults = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
        .then(res => {
          if (res.data.isSessionValid === false)
            this.props.history.push("/login");
          else {
            this.setState({ election: res.data.election }, () => {
              this.initializeRoute().then(() =>
                this.state.filtered
                  ? this.getTableResults(this.state.tableURL, false)
                  : this.getVotesData(false)
              );
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.updateResults)
        );
      return req;
    }
  };

  /*
    Gets the current election object
  */
  getElection = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState(
              {
                election: res.data.election,
                componentIsLoading:
                  res.data.election === null
                    ? false
                    : res.data.election.status === "ongoing" ||
                      res.data.election.status === "completed"
                    ? true
                    : false,
              },
              () => {
                if (this.state.election !== null) this.resultsKickstarter();
              }
            );
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getElection)
        );
      return req;
    }
  };

  /**
   * Runs each time the filter select boxes are changed
   */
  handleFilterSelect = e => {
    if (this._mounted) {
      let { name, value } = e.target;
      if (name === "filterState")
        this.setState(
          {
            selectedState: value,
            selectedLga: "",
            selectStateObject: null,
            selectedLgaObject: null,
          },
          () => this.filter()
        );
      else
        this.setState(
          {
            selectedLga: value,
            selectStateObject: null,
            selectedLgaObject: null,
          },
          () => this.filter()
        );
    }
  };

  /**
   * Handles filtering of the results table by either state or LGA. I hold the selected state
   * and object in state and decide what URL to show by that
   */
  filter = () => {
    const filterState = this.state.selectedState;
    const filterLGA = this.state.selectedLga;
    if (filterState !== "") {
      if (filterLGA === "") {
        this.setState(
          {
            tableURL: `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes/bystate/${filterState}`,
            filtered: true,
          },
          () => this.getTableResults(this.state.tableURL)
        );
      } else {
        this.setState(
          {
            tableURL: `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes/bylga/${filterLGA}`,
            filtered: true,
          },
          () => this.getTableResults(this.state.tableURL)
        );
      }
    } else {
      this.setState(
        {
          lgas: [],
          selectedState: "",
          selectedLga: "",
          selectStateObject: null,
          selectedLgaObject: null,
        },
        this.setState(
          {
            tableURL: `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes`,
            filtered: false,
          },
          this.getVotesData
        )
      );
    }
  };

  /**
   * Populates the parties table with results gotten from a URL it's agnostic about. Other methods
   * decide what that URL would be and feed this method with it to populate the table.
   */
  getTableResults = (url, loader = true) => {
    if (this._mounted) {
      this.setState({ tableLoading: loader, lgaIsLoading: loader });
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "get",
      })
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.votesData = res.data.parties;
            this.setState(state => ({
              tableLoading: false,
              lgas: res.data.lgas === undefined ? state.lgas : res.data.lgas,
              lgaIsLoading: false,
              selectStateObject: res.data.state_object,
              selectedLgaObject: res.data.lga_object,
              tableTotal: res.data.total_votes,
            }));
          }
        })
        .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
    }
  };

  /**
   * Once I'm sure an election exists after running the getElection method, I run this method
   * to initialize state with the information the other methods need to run. This method also gets
   * the election highlights data.
   */
  initializeRoute = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/results`)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState(
              {
                totalVotes: res.data.total_votes,
                lastVoteCast: res.data.last_voted_at,
                componentIsLoading: false,
                mostVotedParty: res.data.most_voted_party,
                leastVotedParty: res.data.least_voted_party,
                numberOfParties: res.data.number_of_parties,
                totalParties: res.data.total_parties,
                states: res.data.states,
                noResults: res.data.no_results,
                duration: res.data.duration,
                timeLeft: res.data.time_left,
              },
              () => {
                if (this.state.totalParties > 0 && this.state.totalVotes > 0)
                  this.getPieChart(this.state.totalParties);
              }
            );
          }
        })
        .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this._results);
  }

  /**
   * Pretty self-explantory huh :) -- This method gets the piechart data
   */
  getPieChart = number => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(
          `${process.env.REACT_APP_API_PATH}/api/dashboard/results/pie/${number}`
        )
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.pieData = res.data.parties;
            this.setState(
              {
                pieChartIsLoading: false,
                noResults: res.data.no_results,
              },
              () => {
                if (this.state.totalParties > 0 && this.state.totalVotes > 0)
                  this.getAreaData();
              }
            );
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getPieChart)
        );
      return req;
    }
  };

  /**
   * This method initially populates the votes table with it's data. It is also called whenever
   * the state filter is set to none.
   */
  getVotesData = (loader = true) => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      if (!this.state.votesIsLoading && loader === true)
        this.setState({ tableLoading: true });
      const req = axios
        .get(this.state.tableURL)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.votesData = res.data.parties;
            this.setState({
              votesIsLoading: false,
              noResults: res.data.no_results,
              tableTotal: res.data.table_total,
              tableLoading: false,
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getVotesData)
        );
      return req;
    }
  };

  /**
   * Forgive the misleading name. This method fetches the bar-chart data. It's called getAreaData
   * because the bar chart was supposed to be an area chart but after implementing it, it felt lame
   * so I changed it to a bar chart.
   */
  getAreaData = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/results/area`)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.areaData = res.data.data;
            this.setState({
              areaIsLoading: false,
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getAreaData)
        );
      return req;
    }
  };

  render() {
    return (
      <>
        <ResultsHomeRouteView
          userManager={this._userManager}
          pieData={this.pieData}
          votesData={this.votesData}
          areaData={this.areaData}
          handleFilterSelect={this.handleFilterSelect}
          {...this.props}
          {...this.state}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default ResultsHomeRoute;
