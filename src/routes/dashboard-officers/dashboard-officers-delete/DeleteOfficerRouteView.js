import React from "react";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import BrokenLinkCard from "components/cards/broken-link-card/BrokenLink";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import Helmet from "react-helmet";
import officer from "assets/img/icons/officer.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";

function DeleteOfficialRouteView(props) {
	return props.componentIsLoading ? (
		<SubRouteLoader />
	) : props.officer === null ? (
		<BrokenLinkCard />
	) : (
		<Row id={"deleteCandidate"}>
			<Col md={12}>
				<BaseCard>
					<Helmet>
						<title>{process.env.REACT_APP_NAME} | Delete Officer</title>
					</Helmet>
					<div className="title clearfix o-auto">
						<div className="float-left">
							<img
								src={officer}
								alt="No parties found"
								className={"title-icon small"}
							/>
						</div>
						<div className="float-left">
							<p className={"title"}>Delete Polling Officer</p>
						</div>
					</div>
					<p className="subtitle poppins">
						Are you sure you make <b>{props.officer.name}</b> to stop being an
						polling officer?
					</p>
					<ul className={"no-style m-0 p-0 h-menu"}>
						<li>
							<LinkButton
								medium
								className={"confirm-background mr-3"}
								onClick={e => props.handleDelete(e)}
								to={`/dashboard/officers/${props.officer.id}/delete`}
							>
								{props.deleting ? (
									<i className="fas fa-spinner fa-pulse" />
								) : (
									"Yes"
								)}
							</LinkButton>
						</li>
						<li>
							<LinkButton
								medium
								className={"reject-background"}
								to={`/dashboard/officers`}
							>
								No
							</LinkButton>
						</li>
					</ul>
				</BaseCard>
			</Col>
		</Row>
	);
}

export default DeleteOfficialRouteView;
