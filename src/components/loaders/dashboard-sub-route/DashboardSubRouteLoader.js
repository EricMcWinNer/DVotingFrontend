import React from "react";
import Helmet from "react-helmet";

import "./index.sass";
import RingLoader from "components/loaders/ring-loader";

function DashboardSubRouteLoader({ className, ...props }) {
  return (
    <div
      {...props}
      className={`subRouteLoader${
        className === undefined ? "" : ` ${className}`
      }`}
    >
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Loading...</title>
      </Helmet>
      <RingLoader />
    </div>
  );
}

export default DashboardSubRouteLoader;
