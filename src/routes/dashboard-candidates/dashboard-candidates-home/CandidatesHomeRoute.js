import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CandidatesHomeRouteView from "./CandidatesHomeRouteView";
import UserManager from "security/UserManager";

class CandidatesHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      candidates: null,
      currentPage: 1,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
      showNoCandidateModal: true,
      candidateIsLoading: false,
      fireDeleteModal: false,
      fireDeleteSuccessModal: false,
      candidate: null,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    this.initializeRoute();
  }

  //This method is run the first time and at other times to keep the route up to date
  //or refresh the route.
  initializeRoute = (table = false) => {
    if (this._mounted) {
      this.setState({ componentIsLoading: !table, tableLoading: table });
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/list/${this.state.perPage}?page=${this.state.currentPage}`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            componentIsLoading: false,
            tableLoading: false,
            candidates: res.data.candidates.data,
            currentPage: res.data.candidates.current_page,
            totalPages: res.data.candidates.last_page,
            perPage: res.data.candidates.per_page,
            totalResults: res.data.candidates.total,
          });
        }
        return req;
      });
    }
  };

  closeDeleteModal = () => {
    if (this._mounted) this.setState({ fireDeleteModal: false });
  };

  //Fetches the selected candidate's info by id from the API.
  getCandidate = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.get(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${id}`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        } else {
          this.setState({
            candidate: res.data.candidate,
          });
        }
      });
      return req;
    }
  };

  //Deletes the candidate - bye bye :(
  deleteCandidate = id => {
    if (this._mounted) {
      axios.defaults.withCredentials = true;
      const req = axios.delete(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/${id}`
      );
      req.then(res => {
        if (res.data.isSessionValid === false) {
          this.props.history.push("/login");
        }
      });
      return req;
    }
  };

  //Asks user for confirmation before deleting a candidate.
  showDeleteModal = (e, id) => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ candidateIsLoading: true, fireDeleteModal: true });
      this.getCandidate(id).then(res => {
        this.setState({ candidateIsLoading: false });
      });
    }
  };

  //After confirmation this method fires the deleteCandidate method to actually delete
  //the candidate.
  deleteCandidateConfirm = () => {
    if (this._mounted) {
      this.setState({ candidateIsLoading: true });
      this.deleteCandidate(this.state.candidate.id).then(res => {
        this.setState({
          fireDeleteModal: false,
          candidateIsLoading: false,
          fireDeleteSuccessModal: true,
        });
      });
    }
  };

  //Method to actually confirm the user's confirmation.
  handleModalConfirmation = () => {
    if (this._mounted) {
      this.setState({ fireDeleteSuccessModal: false });
      this.initializeRoute(true);
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  //Fires whenever the rows per page of the datatable changes to refresh the table.
  changeRowsPerPage = (rowsPerPage, page) => {
    if (this._mounted) {
      this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
    }
  };

  //Fires whenever the pagination button of the datatable is clicked to refresh the table.
  changePage = currentPage => {
    if (this._mounted) {
      this.setState({ tableLoading: true, currentPage });
      axios.defaults.withCredentials = true;
      let needle = this.searchNeedle.current.value,
        url;
      if (needle === "" || needle === undefined || needle === null) {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/list/${this.state.perPage}?page=${currentPage}`;
      } else {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/search/${this.state.perPage}/${needle}?page=${currentPage}`;
      }
      this.getTableResults(url);
    }
  };

  //Fires whenever the enter button is clicked on the search field to get candidates.
  getSearchResults = needle => {
    if (this._mounted) {
      let url;
      if (needle === "" || needle === undefined || needle === null) {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/list/${this.state.perPage}?page=${this.state.currentPage}`;
      } else {
        url = `${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/search/${this.state.perPage}/${needle}`;
      }
      this.getTableResults(url);
    }
  };

  //Fires after the logic to decide the final route the table data would be fethed
  //from has been completed. This method is agnostic to the URL the data would be
  //fetched from. It just receives a URL and populates the table based on that.
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
            candidates: res.data.candidates.data,
            currentPage: res.data.candidates.current_page,
            totalPages: res.data.candidates.last_page,
            perPage: res.data.candidates.per_page,
            totalResults: res.data.candidates.total,
          });
        }
      });
    }
  };

  //This method clears the search for candidates and returns the table to it's orginal state.
  clearSearch() {
    if (this._mounted && this.setState.current.value !== "") {
      this.searchNeedle.current.value = "";
      this.getSearchResults(this.searchNeedle.current.value);
    }
  }

  redirectToCreate = () => {
    this.props.history.push("/dashboard/candidates/create");
  };

  redirectToHome = () => {
    this.props.history.push("/dashboard/");
  };

  closeNoCandidatesModal = () => {
    this.setState({ showNoCandidateModal: false });
  };

  render() {
    return (
      <CandidatesHomeRouteView
        getTableResults={this.getTableResults}
        changePage={this.changePage}
        clearSearch={this.clearSearch}
        changeRowsPerPage={this.changeRowsPerPage}
        getSearchResults={this.getSearchResults}
        searchNeedle={this.searchNeedle}
        userManager={this._userManager}
        redirectToCreate={this.redirectToCreate}
        redirectToHome={this.redirectToHome}
        closeNoCandidatesModal={this.closeNoCandidatesModal}
        closeDeleteModal={this.closeDeleteModal}
        showDeleteModal={this.showDeleteModal}
        deleteCandidateConfirm={this.deleteCandidateConfirm}
        handleModalConfirmation={this.handleModalConfirmation}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default CandidatesHomeRoute;
