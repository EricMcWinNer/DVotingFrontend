import React from "react";

import logo from "assets/img/logo/logo1.png";
function Logo(props) {
  return (
    <div>
      <img
        src={logo}
        className={props.imgClass === undefined ? "" : props.imgClass}
        width={props.width}
        alt={"Logo"}
      />
      <span
        className={props.spanClass === undefined ? "" : props.spanClass}
        style={props.styles}
      >
        {process.env.REACT_APP_NAME}
      </span>
    </div>
  );
}

export default Logo;
