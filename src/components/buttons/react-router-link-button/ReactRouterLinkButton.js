import React from "react";
import "./index.sass";
import { Link } from "react-router-dom";

function ReactRouterLinkButton(props) {
  const styles = {
    backgroundColor: props.backgroundColor,
    color: props.color
  };
  return (
    <Link
      to={props.to}
      style={styles}
      title={props.title === undefined ? "" : props.title}
      className={`${props.small ? "small" : ""} ${
        props.medium ? "medium" : ""
      } react-router-link-button ${props.className}`}
      onClick={props.onClick === undefined ? () => {} : e => props.onClick(e)}
      id={props.id}
    >
      {props.children}
    </Link>
  );
}

export default ReactRouterLinkButton;
