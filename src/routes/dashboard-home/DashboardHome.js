import React, { Component } from "react";

import DashboardHomeView from "routes/dashboard-home/DashboardHomeView";
import axios from "axios";

class DashboardHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			election: null,
			voters: null,
			parties: null,
			candidates: null,
			officers: null,
			componentIsLoading: true,
		};
	}

	componentDidMount() {
		this._mounted = true;
		axios.defaults.withCredentials = true;
		axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/home`, {
			method: "get",
		}).then(res => {
			if (res.data.isSessionValid == "true") {
				this.setState({
					loggedIn: res.data.isSessionValid == "true",
					election: res.data.election.original.election,
					voters: res.data.voters,
					parties: res.data.parties,
					candidates: res.data.candidates,
					officers: res.data.officers,
					componentIsLoading: false,
				});
			} else this.props.history.push("/login");
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	render() {
		return <DashboardHomeView {...this.state} />;
	}
}

export default DashboardHome;
