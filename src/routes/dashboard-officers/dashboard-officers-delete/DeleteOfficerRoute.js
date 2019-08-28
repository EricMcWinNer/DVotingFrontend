import React, { Component } from "react";
import axios from "axios";

import DeleteOfficerRouteView from "./DeleteOfficerRouteView";

class DeleteOfficerRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentIsLoading: true,
			officer: null,
			deleting: false,
		};
	}

	componentDidMount() {
		this._mounted = true;
		axios.defaults.withCredentials = true;
		axios(
			`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}`,
			{
				method: "get",
			}
		).then(res => {
			if (res.data.isSessionValid == "false") {
				this.props.history.push("/login");
			} else {
				this.setState({
					componentIsLoading: false,
					officer: res.data.officer,
				});
			}
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	handleDelete = e => {
		if (this._mounted) {
			e.preventDefault();
			this.setState({ deleting: true });
			axios.defaults.withCredentials = true;
			axios(
				`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}`,
				{
					method: "delete",
				}
			).then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				} else {
					this.setState({
						deleting: false,
					});
					if (res.data.completed) {
						alert("Polling Officer deleted successfully");
						this.props.history.push("/dashboard/officers");
					} else {
						alert("An error occurred.");
						this.props.history.push("/dashboard/officers");
					}
				}
			});
		}
	};

	render() {
		return (
			<DeleteOfficerRouteView
				handleDelete={this.handleDelete}
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default DeleteOfficerRoute;
