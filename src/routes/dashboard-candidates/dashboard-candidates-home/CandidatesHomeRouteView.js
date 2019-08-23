import React from "react";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";

function CandidatesHomeRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <BaseCard>
      <div />
    </BaseCard>
  );
}

export default CandidatesHomeRouteView;
