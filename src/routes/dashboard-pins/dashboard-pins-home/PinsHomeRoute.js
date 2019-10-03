import React, { Component } from "react";
import UserManager from "security/UserManager";
import axios from "axios";

import PinsHomeRouteView from "./PinsHomeRouteView";

class PinHomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      pins: null,
      type: "",
      status: "unused",
      currentPage: 0,
      totalPages: 0,
      perPage: 20,
      totalResults: 0,
      tableLoading: false,
    };
    this._userManager = new UserManager(this.props.user);
  }

  componentDidMount() {
    this._mounted = true;
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/pins/${this.state.perPage}?status=${this.state.status}&type=${this.state.type}`,
      {
        method: "get",
      }
    ).then(res => {
      if (res.data.isSessionValid === false) {
        this.props.history.push("/login");
      } else {
        this.setState({
          pins: res.data.pins.data,
          componentIsLoading: false,
          currentPage: res.data.pins.current_page,
          totalPages: res.data.pins.last_page,
          perPage: res.data.pins.per_page,
          totalResults: res.data.pins.total,
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleFilterSelect = e => {
    if (this._mounted) {
      let { name, value } = e.target;
      if (name === "filterByStatus")
        this.setState({ status: value }, () => this.filter());
      else this.setState({ type: value }, () => this.filter());
    }
  };

  filter() {
    if (this._mounted) {
      const url = `${process.env.REACT_APP_API_PATH}/api/dashboard/pins/${this.state.perPage}?status=${this.state.status}&type=${this.state.type}`;
      this.getTableResults(url);
    }
  }

  changePage = currentPage => {
    if (this._mounted) {
      this.setState({ tableLoading: true, currentPage });
      const url = `${process.env.REACT_APP_API_PATH}/api/dashboard/pins/${this.state.perPage}?status=${this.state.status}&type=${this.state.type}&page=${currentPage}`;
      this.getTableResults(url);
    }
  };

  changeRowsPerPage = (rowsPerPage, page) => {
    if (this._mounted) {
      this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
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
            pins: res.data.pins.data,
            tableLoading: false,
            currentPage: res.data.pins.current_page,
            totalPages: res.data.pins.last_page,
            perPage: res.data.pins.per_page,
            totalResults: res.data.pins.total,
          });
        }
      });
    }
  };

  render() {
    return (
      <PinsHomeRouteView
        userManager={this._userManager}
        changeRowsPerPage={this.changeRowsPerPage}
        changePage={this.changePage}
        handleFilterSelect={this.handleFilterSelect}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default PinHomeRoute;
