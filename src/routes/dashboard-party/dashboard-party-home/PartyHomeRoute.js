import React, { Component } from "react";
import axios from "axios";

import PartyHomeRouteView from "./PartyHomeRouteView";
import UserManager from "security/UserManager";

class PartyHomeRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentIsLoading: true,
			parties: null,
			currentPage: 1,
			totalPages: 0,
			perPage: 20,
			totalResults: 0,
			tableLoading: false,
			partyIsDeleting: false,
			fireDeleteModal: false,
			fireDeleteSuccessModal: false,
			party: null,
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
			axios(
				`${process.env.REACT_APP_API_PATH}/api/dashboard/party/all?page=${this.state.currentPage}`,
				{
					method: "get",
				}
			).then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				} else {
					this.setState({
						componentIsLoading: false,
						tableLoading: false,
						parties: res.data.parties.data,
						currentPage: res.data.parties.current_page,
						totalPages: res.data.parties.last_page,
						perPage: res.data.parties.per_page,
						totalResults: res.data.parties.total,
					});
				}
			});
		}
	};

	closeDeleteModal = () => {
		if (this._mounted) this.setState({ fireDeleteModal: false });
	};

	componentWillUnmount() {
		this._mounted = false;
	}

	changePage = currentPage => {
		if (this._mounted) {
			this.setState({ tableLoading: true, currentPage });
			const searchNeedle = this.searchNeedle.current.value;
			let url;
			if (searchNeedle !== "") {
				url = `${process.env.REACT_APP_API_PATH}/api/dashboard/party/search/${searchNeedle}/${this.state.perPage}?page=${currentPage}`;
			} else {
				url = `${process.env.REACT_APP_API_PATH}/api/dashboard/party/all/${this.state.perPage}?page=${currentPage}`;
			}
			this.getTableResults(url);
		}
	};

	changeRowsPerPage = (rowsPerPage, page) => {
		if (this._mounted) {
			this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
		}
	};

	getSearchResults = needle => {
		if (this._mounted) {
			let search, url;
			if (needle !== undefined) search = needle;
			else search = this.searchNeedle.current.value;
			this.setState({ tableLoading: true });
			axios.defaults.withCredentials = true;
			if (search === "" || search === undefined || search === null) {
				url = `${process.env.REACT_APP_API_PATH}/api/dashboard/party/all/${this.state.perPage}?page=${this.state.currentPage}`;
			} else {
				url = `${process.env.REACT_APP_API_PATH}/api/dashboard/party/search/${search}/${this.state.perPage}`;
			}
			this.getTableResults(url);
		}
	};

	getTableResults = url => {
		if (this._mounted) {
			axios.defaults.withCredentials = true;
			axios(url, {
				method: "get",
			}).then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				} else {
					this.setState({
						tableLoading: false,
						parties: [...res.data.parties.data],
						currentPage: res.data.parties.current_page,
						totalPages: res.data.parties.last_page,
						perPage: res.data.parties.per_page,
						totalResults: res.data.parties.total,
					});
				}
			});
		}
	};

	getParty = id => {
		if (this._mounted) {
			axios.defaults.withCredentials = true;
			const req = axios.get(
				`${process.env.REACT_APP_API_PATH}/api/dashboard/party/${id}`
			);
			req.then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				} else {
					this.setState({
						party: res.data.party,
					});
				}
			});
			return req;
		}
	};

	deleteParty = id => {
		if (this._mounted) {
			axios.defaults.withCredentials = true;
			const req = axios.delete(
				`${process.env.REACT_APP_API_PATH}/api/dashboard/party/${id}`
			);
			req.then(res => {
				if (res.data.isSessionValid == "false") {
					this.props.history.push("/login");
				}
			});
			return req;
		}
	};

	closeDeleteModal = () => {
		if (this._mounted) this.setState({ fireDeleteModal: false });
	};

	showDeleteModal = (e, id) => {
		if (this._mounted) {
			e.preventDefault();
			this.setState({ partyIsDeleting: true, fireDeleteModal: true });
			this.getParty(id).then(res => {
				this.setState({ partyIsDeleting: false });
			});
		}
	};

	deletePartyConfirm = () => {
		if (this._mounted) {
			this.setState({ partyIsDeleting: true });
			this.deleteParty(this.state.party.id).then(res => {
				this.setState({
					fireDeleteModal: false,
					partyIsDeleting: false,
					fireDeleteSuccessModal: true,
				});
			});
		}
	};

	handleModalConfirmation = () => {
		if(this._mounted)
		{
			this.setState({fireDeleteSuccessModal: false});
			this.initializeRoute(true);
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
			<PartyHomeRouteView
				clearSearch={this.clearSearch}
				changePage={this.changePage}
				changeRowsPerPage={this.changeRowsPerPage}
				getSearchResults={this.getSearchResults}
				searchNeedle={this.searchNeedle}
				closeDeleteModal={this.closeDeleteModal}
				userManager={this._userManager}
				showDeleteModal={this.showDeleteModal}
				deletePartyConfirm={this.deletePartyConfirm}
				handleModalConfirmation={this.handleModalConfirmation}
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default PartyHomeRoute;
