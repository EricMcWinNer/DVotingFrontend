import React from "react";

import "./index.sass";

function ProgressBar(props) {
  return (
    <div className={`fullWidth bar-container`}>
      <span className={"progress-percent"}>{props.progress}%</span>
      <div className={`progress force b-${props.progress}`}></div>
    </div>
  );
}

export default ProgressBar;
