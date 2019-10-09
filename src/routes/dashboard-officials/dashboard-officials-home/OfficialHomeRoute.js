import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import OfficialHomeRouteView from "./OfficialHomeRouteView";
import UserManager from "security/UserManager";
import { initialAjaxAlertState, fireAjaxErrorAlert } from "utils/error";
import ErrorAlert from "components/error-alert";

class OfficialHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      officials: null,
      currentPage: 1,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
      selectedState: "",
      selectedLga: "",
      lgas: null,
      states: null,
      officialIsLoading: false,
      fireDeleteModal: false,
      fireDeleteSuccessModal: false,
      official: null,
      ...initialAjaxAlertState,
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
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/index/${
          this.state.perPage
        }${table ? `?page=${this.state.currentPage}` : ""}`
      );
      req
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState(state => ({
              componentIsLoading: false,
              tableLoading: false,
              officials: res.data.officials.data,
              currentPage: res.data.officials.current_page,
              totalPages: res.data.officials.last_page,
              perPage: res.data.officials.per_page,
              totalResults: res.data.officials.total,
              states: table ? state.states : res.data.states,
              lgas: table ? state.lgas : res.data.lgas,
            }));
          }
        })
        .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
      return req;
    }
  };

  closeDeleteModal = () => {
    if (this._mounted) this.setState({ fireDeleteModal: false });
  };

  getOfficial = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${id}`
      );
      req
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState({
              official: res.data.official,
            });
          }
        })
        .catch(res => fireAjaxErrorAlert(this, res.request.status, null));
      return req;
    }
  };

  deleteOfficial = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.delete(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/${id}`
      );
      req
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          }
        })
        .catch(res =>
          fireAjaxErrorAlert(this, res.request.status, null, false)
        );
      return req;
    }
  };

  showDeleteModal = (e, id) => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ officialIsLoading: true, fireDeleteModal: true });
      this.getOfficial(id).then(res => {
        this.setState({ officialIsLoading: false });
      });
    }
  };

  deleteOfficialConfirm = () => {
    if (this._mounted) {
      this.setState({ officialIsLoading: true });
      this.deleteOfficial(this.state.official.id).then(res => {
        this.setState({
          fireDeleteModal: false,
          officialIsLoading: false,
          fireDeleteSuccessModal: true,
        });
      });
    }
  };

  handleModalConfirmation = () => {
    if (this._mounted) {
      if (this.state.official.id === this._userManager.returnUser().id) {
        this.props.updateUser().then(res => {
          this.props.history.push("/dashboard");
        });
      } else {
        this.setState({ fireDeleteSuccessModal: false });
        this.initializeRoute(true);
      }
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
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}&filter_by=lga&filter_value=${filterLGA}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/index/${this.state.perPage}?page=${currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbystate/${filterState}/${this.state.perPage}?page=${currentPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbylga/${filterLGA}/${this.state.perPage}?page=${currentPage}`;
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
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbystate/${filterState}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${search}/${perPage}?filter_by=state&filter_value=${filterState}`;
      this.getTableResults(url);
    } else if (filterState === "" && filterLGA !== "") {
      url =
        search === ""
          ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbylga/${filterLGA}/${perPage}`
          : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${search}/${perPage}?filter_by=lga&filter_value=${filterLGA}`;
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
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/index/${this.state.perPage}?page=${this.state.currentPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbystate/${filterState}/${this.state.perPage}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/filterbylga/${filterLGA}/${this.state.perPage}`;
      } else {
        if (filterState === "" && filterLGA === "")
          url = `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${search}/${this.state.perPage}`;
        else
          url =
            filterState !== ""
              ? `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${search}/${this.state.perPage}?filter_by=state&filter_value=${filterState}`
              : `${process.env.REACT_APP_API_PATH}/api/dashboard/officials/search/${search}/${this.state.perPage}?filter_by=lga&filter_value=${filterLGA}`;
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
      })
        .then(res => {
          if (res.data.isSessionValid === false) {
            this.props.history.push("/login");
          } else {
            this.setState({
              tableLoading: false,
              officials: [...res.data.officials.data],
              currentPage: res.data.officials.current_page,
              totalPages: res.data.officials.last_page,
              perPage: res.data.officials.per_page,
              totalResults: res.data.officials.total,
            });
          }
        })
        .catch(res => {
          this.state({ tableLoading: false });
          fireAjaxErrorAlert(this, res.request.status, null, false);
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
      <>
        <OfficialHomeRouteView
          clearSearch={this.clearSearch}
          changePage={this.changePage}
          changeRowsPerPage={this.changeRowsPerPage}
          getSearchResults={this.getSearchResults}
          handleChange={this.handleChange}
          handleFilterSelect={this.handleFilterSelect}
          searchNeedle={this.searchNeedle}
          closeDeleteModal={this.closeDeleteModal}
          showDeleteModal={this.showDeleteModal}
          deleteOfficialConfirm={this.deleteOfficialConfirm}
          handleModalConfirmation={this.handleModalConfirmation}
          userManager={this._userManager}
          {...this.props}
          {...this.state}
        />
        <ErrorAlert state={this.state} />
      </>
    );
  }
}

export default OfficialHomeRoute;
