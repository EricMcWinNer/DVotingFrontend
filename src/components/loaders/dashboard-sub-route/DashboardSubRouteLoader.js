import React from "react";
import Helmet from "react-helmet";

import "./index.sass";
import RingLoader from "components/loaders/ring-loader";

function DashboardSubRouteLoader(props) {
  return (
    <div className={"subRouteLoader"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Loading...</title>
      </Helmet>
      <RingLoader />
    </div>
  );
}

export default DashboardSubRouteLoader;
