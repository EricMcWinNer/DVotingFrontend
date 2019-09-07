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
      lgas: null,
      states: null,
    };
    this._userManager = new UserManager(this.props.user);
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
            states: res.data.states,
            lgas: res.data.lgas,
          });
        }
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <ViewRegisteredVotersRouteView
        userManager={this._userManager}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default ViewVotersRegisteredRoute;
