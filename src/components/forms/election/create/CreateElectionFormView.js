import React from "react";
import DateTimePicker from "react-datetime-picker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import warningIcon from "assets/img/icons/warning.png";
import createIcon from "assets/img/icons/create.png";
import { Link } from "react-router-dom";
import SubRouteLoader from "components/loaders/dashboard-sub-route";
import Helmet from "react-helmet";
import SweetAlert from "react-bootstrap-sweetalert";

/* TODO - FIX THE FUCKED UP FLOAT HERE */

function CreateElectionForm(props) {
	const userManager = props.userManager;
	return (
		<Row id={"createElectionForm"}>
			{props.componentIsLoading ? (
				<SubRouteLoader />
			) : (
				<Col md={{ span: 8, offset: 1 }}>
					{props.election === null ? (
						<BaseCard>
							<Helmet>
								<title>{process.env.REACT_APP_NAME} | Create Election</title>
							</Helmet>
							<div className="title clearfix o-auto">
								<div className="float-left">
									<img
										src={createIcon}
										alt="Create Election"
										className={"title-icon small"}
									/>
								</div>
								<div className="float-left">
									<p className={"title"}>Create Election</p>
								</div>
							</div>
							<p className="subtitle poppins">
								Please fill in the form below to create an election
							</p>
							<form
								id={"electionCreationForm"}
								onSubmit={e => props.handleSubmit(e)}
								className={"poppins"}
							>
								<div className="fullWidth inputGroup">
									<label htmlFor={"electionName"}>Election Name:</label>
									<input
										id={"electionName"}
										type="text"
										name={"electionName"}
										value={props.electionName}
										onChange={props.onChange}
										placeholder={"Election Name"}
									/>
								</div>
								<div className="fullWidth inputGroup">
									<label htmlFor="startDate">Start Date:</label>
									<DateTimePicker
										id={"startDate"}
										name={"startDate"}
										onChange={props.handleStartDateChange}
										value={props.startDate}
									/>
								</div>
								<div className="fullWidth inputGroup">
									<label htmlFor="endDate">End Date:</label>
									<DateTimePicker
										id={"endDate"}
										name={"endDate"}
										onChange={props.handleEndDateChange}
										value={props.endDate}
									/>
								</div>
								<button type={"submit"} className={"submitForm"}>
									{props.formIsSubmitting ? (
										<i className="fas fa-spinner fa-pulse" />
									) : (
										<>
											<i className="far mr-2 fa-save" />
											Submit
										</>
									)}
								</button>
							</form>
							{userManager.isOfficial() &&
								!props.componentIsLoading &&
								props.showErrorAlert && (
									<SweetAlert
										type={props.alertType}
										allowEscape
										closeOnClickOutside
                    title={props.errorTitle}
										onConfirm={(typeof props.alertCallBack).toLowerCase() === "function" ? props.alertCallBack : props.closeErrorModal}
										onCancel={props.closeErrorModal}
									>
										<span className="cartogothic">{props.errorMessage}</span>
									</SweetAlert>
								)}
						</BaseCard>
					) : (
						<BaseCard id={"nullCard"}>
							<Helmet>
								<title>
									{process.env.REACT_APP_NAME} | Election already exists
								</title>
							</Helmet>
							<div className="clearfix o-auto">
								<div className="float-left iconContainer">
									<img
										src={warningIcon}
										alt={"Warning: No Election Configured"}
									/>
								</div>
								<div className="float-left">
									<h4 className={"nullCardTitle"}>
										An election has already been created
									</h4>
									<p className={"mt-4"}>
										Only one election can be active at a time, you can only
										manage the current existing election with the link below.
										With that link you can either edit the current election, set
										the election to "finalized" or delete the election to create
										a new one.
									</p>
									<ul className={"no-style m-0 p-0 h-menu"}>
										<li>
											<Link
												id={"manage-election-button"}
												to={`/dashboard/election`}
											>
												Manage
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</BaseCard>
					)}
				</Col>
			)}
		</Row>
	);
}

export default CreateElectionForm;
