import React from "react";

import "./index.sass";

function RingLoader(props) {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default RingLoader;
