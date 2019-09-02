import React from "react";
import "./index.sass";
import { Link } from "react-router-dom";

function ReactRouterLinkButton({ className, small, medium, ...props }) {
	const styles = {
		backgroundColor: props.backgroundColor,
		color: props.color,
	};
	return (
		<Link
			style={styles}
			className={`${small ? "small" : ""} ${
				medium ? "medium" : ""
			} react-router-link-button ${className}`}
			{...props}
		>
			{props.children}
		</Link>
	);
}

export default ReactRouterLinkButton;
