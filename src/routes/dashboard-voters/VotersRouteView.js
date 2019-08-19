import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";

function VotersView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <BaseCard>Voters</BaseCard>
  );
}

export default VotersView;
