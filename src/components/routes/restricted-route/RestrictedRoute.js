import React from "react";
import { Redirect, Route } from "react-router-dom";
import ForbiddenCard from "components/cards/forbidden-card";

function RestrictedRoute({ isAuthorized, ...props }) {
  return isAuthorized ? <Route {...props} /> : <ForbiddenCard />;
}

export default RestrictedRoute;
