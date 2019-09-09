import React, { Component } from "react";

import "./index.sass";
import UserManager from "security/UserManager";
import axios from "axios";
import ViewRegisteredVotersRouteView from "./ViewVotersRegisteredRouteView";

class ViewVotersRegisteredRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voters: null,
      officer: null,
      currentPage: 0,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
    };
    this._userManager = new UserManager(this.props.user);
    this.searchNeedle = React.createRef();
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}/voters/${this.state.perPage}`
      )
      .then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            tableLoading: false,
            officer: res.data.officer,
            voters: res.data.voters.data,
            currentPage: res.data.voters.current_page,
            totalPages: res.data.voters.last_page,
            perPage: res.data.voters.per_page,
            totalResults: res.data.voters.total,
          });
        }
      });
  }

  changeRowsPerPage = (rowsPerPage, page) => {
    if (this._mounted) {
      this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
    }
  };

  getSearchResults = needle => {
    if (this._mounted) {
      let search, url;
      if (needle !== undefined) search = needle;
      else search = this.searchNeedle.current.value;
      this.setState({ tableLoading: true });
      axios.defaults.withCredentials = true;
      if (search === "" || search === undefined || search === null) {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/voters/${this.state.perPage}?page=${this.state.currentPage}`;
      } else {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}/voters/search/${search}/${this.state.perPage}`;
      }
      this.getTableResults(url);
    }
  };

  getTableResults = url => {
    if (this._mounted) {
      this.setState({ tableLoading: true });
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "get",
      }).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          console.log(res.data.voters.data.length, typeof res.data.voters.data);
          this.setState({
            tableLoading: false,
            voters: [...res.data.voters.data],
            currentPage: res.data.voters.current_page,
            totalPages: res.data.voters.last_page,
            perPage: res.data.voters.per_page,
            totalResults: res.data.voters.total,
          });
        }
      });
    }
  };

  clearSearch = () => {
    if (this._mounted && this.searchNeedle.current.value !== "") {
      this.setState(
        {
          currentPage: 1,
        },
        () => {
          this.searchNeedle.current.value = "";
          this.getSearchResults();
        }
      );
    }
  };

  changePage = currentPage => {
    if (this._mounted) {
      this.setState({ tableLoading: true, currentPage });
      const searchNeedle = this.searchNeedle.current.value;
      let url =
        searchNeedle !== ""
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}/voters/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/officers/voters/${this.state.perPage}?page=${currentPage}`;
      this.getTableResults(url);
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <ViewRegisteredVotersRouteView
        userManager={this._userManager}
        clearSearch={this.clearSearch}
        changePage={this.changePage}
        changeRowsPerPage={this.changeRowsPerPage}
        getSearchResults={this.getSearchResults}
        searchNeedle={this.searchNeedle}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ViewVotersRegisteredRoute;
