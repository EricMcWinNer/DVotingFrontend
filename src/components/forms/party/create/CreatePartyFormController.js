import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CreatePartyFormView from "./CreatePartyFormView";

class CreatePartyFormController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentIsLoading: true,
			partyName: "",
			acronym: "",
			partyLogoFile: null,
			fileNotImage: false,
		};
	}

	componentDidMount() {
		this._mounted = true;
		//TODO UPDATE THIS CODE TO HANDLE PROPER USER VALIDATION
		axios.defaults.withCredentials = true;
		axios(`${process.env.REACT_APP_API_PATH}/api/web/auth/validate-web-app-session`, {
			method: "get",
		}).then(res => {
			if (res.data.isSessionValid == "true") {
				this.setState({
					componentIsLoading: false,
				});
			} else this.props.history.push("/login");
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	handleChange = e => {
		let { name, value, type, tagName } = e.target;
		if (
			type === "text" ||
			type === "password" ||
			type === "email" ||
			tagName.toLowerCase() === "select" ||
			type === "date"
		) {
			this.setState({
				[name]: value,
			});
		}
	};

	updatePartyLogo = picture => {
		this.setState({ partyLogoFile: picture });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this._mounted) {
			this.setState({ formIsSubmitting: true }, () => {
				axios.defaults.withCredentials = true;
				let form = new FormData();
				form.append("partyName", this.state.partyName);
				form.append("acronym", this.state.acronym);
				form.append("partyLogo", this.state.partyLogoFile);
				axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/party`, {
					method: "post",
					data: form,
				}).then(res => {
					if (res.data.isSessionValid == "false")
						this.props.history.push("/login");
					else {
						this.setState({
							formIsSubmitting: false,
						});
						if (res.data.isValid === false) {
							if (res.data.field === "partyLogo")
								alert("The party logo you entered is invalid");
							else if (res.data.field === "partyName")
								alert(
									"The party name you entered is invalid. Please enter one less than 256 characters long"
								);
							else if (res.data.field === "acronym")
								alert(
									"The acronym you entered is invalid. Please enter one less than 7 characters long"
								);
							else if (res.data.field === "duplicateName")
								alert(
									"A political party with this name already exists. Political parties must have unique names."
								);
						} else if (res.data.completed === true) {
							alert("Political party created successfully");
							this.props.history.push("/dashboard/party");
						}
					}
				});
			});
		}
	};

	render() {
		return (
			<CreatePartyFormView
				updatePartyLogo={this.updatePartyLogo}
				handleSubmit={this.handleSubmit}
				onChange={this.handleChange}
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default CreatePartyFormController;
