import React, { Component } from "react";
import axios from "axios";

import VoterHomeRouteView from "./VoterHomeRouteView";

class VoterHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      voters: null,
      currentPage: 0,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
      searchUrl: "",
      states: null,
      lgas: null,
      selectedState: "",
      selectedLga: ""
    };
    this.searchNeedle = React.createRef();
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/list/${this.state.perPage}`,
      {
        method: "get"
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          voters: [...res.data.voters.data],
          currentPage: res.data.voters.current_page,
          totalPages: res.data.voters.last_page,
          perPage: res.data.voters.per_page,
          totalResults: res.data.voters.total,
          states: res.data.states,
          lgas: res.data.lgas
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  changePage = currentPage => {
    if (this._mounted) {
      this.setState({ tableLoading: true, currentPage });
      const filterState = this.state.selectedState;
      const filterLGA = this.state.selectedLga;
      const searchNeedle = this.searchNeedle.current.value;
      axios.defaults.withCredentials = true;
      let url;
      if (searchNeedle !== "") {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${searchNeedle}/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=lga&filter_value=${filterLGA}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/list/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbystate/${filterState}/${this.state.perPage}?page=${currentPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbylga/${filterLGA}/${this.state.perPage}?page=${currentPage}`;
      }
      this.getTableResults(url);
    }
  };

  changeRowsPerPage = (rowsPerPage, page) => {
    if (this._mounted) {
      this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
    }
  };

  handleChange = (e, optionalCallBack) => {
    let { name, value, type, tagName } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      tagName.toLowerCase() === "select" ||
      type === "date" ||
      type === "search"
    ) {
      this.setState({
        [name]: value
      });
    }
  };

  handleFilterSelect = e => {
    if (this._mounted) {
      let { name, value } = e.target;
      if (name === "filterState")
        this.setState({ selectedState: value, selectedLga: "" }, () =>
          this.filter()
        );
      else
        this.setState({ selectedLga: value, selectedState: "" }, () =>
          this.filter()
        );
    }
  };

  filter = () => {
    let url;
    const search = this.searchNeedle.current.value;
    const filterState = this.state.selectedState;
    const filterLGA = this.state.selectedLga;
    const perPage = this.state.perPage;
    if (filterState !== "" && filterLGA === "") {
      url =
        search === ""
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbystate/${filterState}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${search}/${perPage}?filter_by=state&filter_value=${filterState}`;
      this.getTableResults(url);
    } else if (filterState === "" && filterLGA !== "") {
      url =
        search === ""
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbylga/${filterLGA}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${search}/${perPage}?filter_by=lga&filter_value=${filterLGA}`;
      this.getTableResults(url);
    } else {
      this.getSearchResults();
    }
  };

  getSearchResults = needle => {
    if (this._mounted) {
      let search, url;
      const filterState = this.state.selectedState;
      const filterLGA = this.state.selectedLga;
      if (needle !== undefined) search = needle;
      else search = this.searchNeedle.current.value;
      this.setState({ tableLoading: true });
      axios.defaults.withCredentials = true;
      if (search === "" || search === undefined || search === null) {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/list/${this.state.perPage}?page=${this.state.currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbystate/${filterState}/${this.state.perPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/filterbylga/${filterLGA}/${this.state.perPage}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${search}/${this.state.perPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${search}/${this.state.perPage}?filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/voters/genericsearch/${search}/${this.state.perPage}?filter_by=lga&filter_value=${filterLGA}`;
      }
      this.getTableResults(url);
    }
  };

  getTableResults = url => {
    if (this._mounted) {
      this.setState({ tableLoading: true });
      axios.defaults.withCredentials = true;
      axios(url, {
        method: "get"
      }).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            tableLoading: false,
            voters: [...res.data.voters.data],
            currentPage: res.data.voters.current_page,
            totalPages: res.data.voters.last_page,
            perPage: res.data.voters.per_page,
            totalResults: res.data.voters.total
          });
        }
      });
    }
  };

  clearSearch = () => {
    if (this._mounted) {
      this.setState(
        {
          currentPage: 1,
          selectedLga: "",
          selectedState: ""
        },
        () => {
          this.searchNeedle.current.value = "";
          this.getSearchResults();
        }
      );
    }
  };

  render() {
    return (
      <VoterHomeRouteView
        clearSearch={this.clearSearch}
        changePage={this.changePage}
        changeRowsPerPage={this.changeRowsPerPage}
        getSearchResults={this.getSearchResults}
        handleChange={this.handleChange}
        handleFilterSelect={this.handleFilterSelect}
        searchNeedle={this.searchNeedle}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default VoterHomeRoute;
