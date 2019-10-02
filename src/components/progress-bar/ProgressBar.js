import React from "react";

import "./index.sass";

function ProgressBar({ progress, color, ...props }) {
  const style = {
    backgroundColor: color ? color : null,
  };
  return (
    <div className={`fullWidth bar-container`}>
      <span className={"progress-percent"}>{progress}%</span>
      <div
        style={style}
        className={`progress force b-${Math.floor(progress)}`}
      ></div>
    </div>
  );
}

export default ProgressBar;
