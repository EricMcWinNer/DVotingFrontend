import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import OfficerHomeRoute from "./dashboard-officers-home";
import CreateOfficerRoute from "./dashboard-officers-create";
import ConfirmOfficerCreationRoute from "./dashboard-officers-create-confirm";
import DeleteOfficerRoute from "./dashboard-officers-delete";

class OfficerRoutes extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	render() {
		const user = this.props.user;
		return (
			<Switch>
				<Route
					exact
					path={`${this.props.match.path}/`}
					render={props => <OfficerHomeRoute user={user} {...props} />}
				/>
				<Route
					exact
					path={`${this.props.match.path}/create`}
					render={props => <CreateOfficerRoute user={user} {...props} />}
				/>
				<Route
					exact
					path={`${this.props.match.path}/:id/create`}
					render={props => (
						<ConfirmOfficerCreationRoute user={user} {...props} />
					)}
				/>
				<Route
					exact
					path={`${this.props.match.path}/:id/delete`}
					render={props => <DeleteOfficerRoute user={user} {...props} />}
				/>
			</Switch>
		);
	}
}

export default OfficerRoutes;
