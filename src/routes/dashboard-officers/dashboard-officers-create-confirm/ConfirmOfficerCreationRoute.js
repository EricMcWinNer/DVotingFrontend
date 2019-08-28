import React, { Component } from "react";
import axios from "axios";

import ConfirmOfficerCreationRouteView from "./ConfirmOfficerCreationRouteView";

class ConfirmOfficerCreationRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentIsLoading: true,
			creating: false,
			prospectiveOfficer: null,
		};
	}

	componentDidMount() {
		this._mounted = true;
		axios.defaults.withCredentials = true;
		axios(
			`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}/create/confirm`,
			{
				method: "get",
			}
		).then(res => {
			if (res.data.isSessionValid == "false") {
				this.props.history.push("/login");
			} else {
				this.setState({
					componentIsLoading: false,
					prospectiveOfficer: res.data.user,
				});
			}
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	handleCreate = e => {
		if (this._mounted) {
			e.preventDefault();
			this.setState({ creating: true });
			axios.defaults.withCredentials = true;
			axios(
				`${process.env.REACT_APP_API_PATH}/api/dashboard/officers/${this.props.match.params.id}`,
				{
					method: "post",
				}
			).then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				} else {
					this.setState({
						creating: false,
					});
					if (res.data.completed) {
						alert("Polling Officer created successfully");
						this.props.history.push("/dashboard/officers");
					} else {
						alert("An error occured");
						this.props.history.push("/dashboard/officers");
					}
				}
			});
		}
	};

	render() {
		return (
			<ConfirmOfficerCreationRouteView
				handleCreate={this.handleCreate}
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default ConfirmOfficerCreationRoute;
