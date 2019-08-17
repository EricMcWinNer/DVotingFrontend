import React from "react";

import "./index.sass";
import RingLoader from "components/loaders/ring-loader";

function DashboardSubRouteLoader(props) {
  return (
    <div className={"subRouteLoader"}>
      <RingLoader />
    </div>
  );
}

export default DashboardSubRouteLoader;
