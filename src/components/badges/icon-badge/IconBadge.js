import React from "react";

import "./index.sass";

function IconBadge(props) {
  let styles;
  if (props.fixedWidth !== undefined) {
    styles = {
      width: props.fixedWidth
    };
  }
  return (
    <div
      style={styles}
      className={`${props.small ? "small" : ""} ${
        props.medium ? "medium" : ""
      } IconBadge ${props.className}`}
      id={props.id}
    >
      {props.children}
    </div>
  );
}

export default IconBadge;
