import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import CandidatesHomeRouteView from "./CandidatesHomeRouteView";

class CandidatesHomeRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentIsLoading: true,
			candidates: null,
			currentPage: 0,
			totalPages: 0,
			perPage: 20,
			totalResults: 0,
			tableLoading: false,
		};
	}

	componentDidMount() {
		this._mounted = true;
		axios.defaults.withCredentials = true;
		axios(
			`${process.env.REACT_APP_API_PATH}/api/dashboard/candidates/list/${this.state.perPage}`,
			{
				method: "get",
			}
		).then(res => {
			if (res.data.isSessionValid == "false") {
				this.props.history.push("/login");
			} else {
				this.setState({
					componentIsLoading: false,
					candidates: res.data.candidates.data,
					currentPage: res.data.candidates.current_page,
					totalPages: res.data.candidates.last_page,
					perPage: res.data.candidates.per_page,
					totalResults: res.data.candidates.total,
				});
			}
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	changeRowsPerPage = (rowsPerPage, page) => {
		if (this._mounted) {
			this.setState({ perPage: rowsPerPage }, () => this.changePage(page));
		}
	};

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

	getTableResults = url => {
		if (this._mounted) {
			this.setState({ tableLoading: true });
			axios.defaults.withCredentials = true;
			axios(url, {
				method: "get",
			}).then(res => {
				if (res.data.isSessionValid == "false") {
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

	clearSearch() {
		if (this._mounted && this.setState.current.value !== "") {
			this.searchNeedle.current.value = "";
			this.getSearchResults(this.searchNeedle.current.value);
		}
	}

	render() {
		return (
			<CandidatesHomeRouteView
				getTableResults={this.getTableResults}
				changePage={this.changePage}
				clearSearch={this.clearSearch}
				changeRowsPerPage={this.changeRowsPerPage}
				getSearchResults={this.getSearchResults}
				searchNeedle={this.searchNeedle}
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default CandidatesHomeRoute;
