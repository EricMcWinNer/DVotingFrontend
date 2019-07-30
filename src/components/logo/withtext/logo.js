import React from "react";

import logo from "assets/img/logo/logo1.png";
function Logo(props) {
  return (
    <div className={"logoContainer"}>
      <img src={logo} className={"logoImg"} alt={"Logo"} />
      <span className={"logoSpan openSans"}>
        {process.env.REACT_APP_NAME}{" "}
        {props.extra === undefined ? "" : props.extra}
      </span>
    </div>
  );
}

export default Logo;
