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
      ...initialAjaxAlertState,
    };
    this._userManager = new UserManager(this.props.user);
  }

  pieData = [];

  votesData = [];

  areaData = [];

  componentDidMount() {
    this._mounted = true;

    this.getElection()
      .then(this.initializeRoute)
      .then(this.getVotesData);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //DO SOMETHING
  }

  getElection = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState({
              election: res.data.election,
              componentIsLoading:
                res.data.election !== null ||
                (res.data.election.status !== "ongoing" &&
                  res.data.election.status !== "completed"),
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getElection)
        );
      return req;
    }
  };

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

  filter = () => {
    let url;
    const filterState = this.state.selectedState;
    const filterLGA = this.state.selectedLga;
    if (filterState !== "") {
      if (filterLGA === "") {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes/bystate/${filterState}`;
        this.getTableResults(url);
      } else {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes/bylga/${filterLGA}`;
        this.getTableResults(url);
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
        this.getVotesData
      );
    }
  };

  getTableResults = url => {
    if (this._mounted) {
      this.setState({ tableLoading: true, lgaIsLoading: true });
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "get",
      }).then(res => {
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
      });
    }
  };

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
                this.getPieChart(this.state.totalParties);
              }
            );
          }
        });
      return req;
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

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
              this.getAreaData
            );
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getPieChart)
        );
      return req;
    }
  };

  getVotesData = () => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios
        .get(`${process.env.REACT_APP_API_PATH}/api/dashboard/results/getvotes`)
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.votesData = res.data.parties;
            this.setState({
              votesIsLoading: false,
              noResults: res.data.no_results,
              tableTotal: res.data.table_total,
            });
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, this.getVotesData)
        );
      return req;
    }
  };

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
