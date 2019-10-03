import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CreateOfficialsRouteView from "./CreateOfficialsRouteView";
import UserManager from "security/UserManager";

//TODO - WHEN YOU HAVE DATA URL ENCODE THE SEARCH STRINGS

class CreateOfficialsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      users: null,
      currentPage: 0,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
      selectedState: "",
      selectedLga: "",
      lgas: null,
      states: null,
      officialIsLoading: false,
      fireCreateModal: false,
      fireCreateSuccessModal: false,
      user: null,
    };
    this.searchNeedle = React.createRef();
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.initializeRoute();
  }

  initializeRoute = (table = false) => {
    if (this._mounted) {
      this.setState({ componentIsLoading: !table, tableLoading: table });
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/${
          this.state.perPage
        }${table ? `?page=${this.state.currentPage}` : ""}`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState(state => ({
            componentIsLoading: false,
            tableLoading: false,
            users: res.data.users.data,
            currentPage: res.data.users.current_page,
            totalPages: res.data.users.last_page,
            perPage: res.data.users.per_page,
            totalResults: res.data.users.total,
            states: table ? state.states : res.data.states,
            lgas: table ? state.lgas : res.data.lgas,
          }));
        }
      });
      return req;
    }
  };

  closeCreateModal = () => {
    if (this._mounted) this.setState({ fireCreateModal: false });
  };

  getUser = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${id}/create/confirm`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            user: res.data.user,
          });
        }
      });
      return req;
    }
  };

  createOfficial = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.post(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${id}/create`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        }
      });
      return req;
    }
  };

  createOfficialConfirm = () => {
    if (this._mounted) {
      this.setState({ officialIsLoading: true });
      this.createOfficial(this.state.user.id).then(res => {
        this.setState({
          fireCreateModal: false,
          officialIsLoading: false,
          fireCreateSuccessModal: true,
        });
      });
    }
  };

  showCreateModal = (e, id) => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ officialIsLoading: true, fireCreateModal: true });
      this.getUser(id).then(res => {
        this.setState({ officialIsLoading: false });
      });
    }
  };

  handleModalConfirmation = () => {
    if (this._mounted) {
      this.setState({ fireCreateSuccessModal: false });
      this.initializeRoute(true);
    }
  };

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
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=lga&filter_value=${filterLGA}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbystate/${filterState}/${this.state.perPage}?page=${currentPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbylga/${filterLGA}/${this.state.perPage}?page=${currentPage}`;
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
        [name]: value,
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
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbystate/${filterState}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${search}/${perPage}?filter_by=state&filter_value=${filterState}`;
      this.getTableResults(url);
    } else if (filterState === "" && filterLGA !== "") {
      url =
        search === ""
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbylga/${filterLGA}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${search}/${perPage}?filter_by=lga&filter_value=${filterLGA}`;
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
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/${this.state.perPage}?page=${this.state.currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbystate/${filterState}/${this.state.perPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/filterbylga/${filterLGA}/${this.state.perPage}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${search}/${this.state.perPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${search}/${this.state.perPage}?filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/create/search/${search}/${this.state.perPage}?filter_by=lga&filter_value=${filterLGA}`;
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
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            tableLoading: false,
            users: [...res.data.users.data],
            currentPage: res.data.users.current_page,
            totalPages: res.data.users.last_page,
            perPage: res.data.users.per_page,
            totalResults: res.data.users.total,
          });
        }
      });
    }
  };

  clearSearch = () => {
    if (
      this._mounted &&
      (this.searchNeedle.current.value !== "" ||
        this.state.selectedLga !== "" ||
        this.state.selectedState !== "")
    ) {
      this.setState(
        {
          currentPage: 1,
          selectedLga: "",
          selectedState: "",
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
      <CreateOfficialsRouteView
        clearSearch={this.clearSearch}
        changePage={this.changePage}
        changeRowsPerPage={this.changeRowsPerPage}
        getSearchResults={this.getSearchResults}
        handleChange={this.handleChange}
        handleFilterSelect={this.handleFilterSelect}
        userManager={this._userManager}
        searchNeedle={this.searchNeedle}
        showCreateModal={this.showCreateModal}
        closeCreateModal={this.closeCreateModal}
        createOfficialConfirm={this.createOfficialConfirm}
        handleModalConfirmation={this.handleModalConfirmation}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default CreateOfficialsRoute;
