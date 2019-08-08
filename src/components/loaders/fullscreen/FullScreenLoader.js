import React from "react";

import "./index.sass";
import PulseFullCircle from "components/loaders/pulse-full-circle";

function FullScreenLoader(props) {
  return (
    <div className="fullScreenLoader">
      <PulseFullCircle />
    </div>
  );
}

export default FullScreenLoader;
