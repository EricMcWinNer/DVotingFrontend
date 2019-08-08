import React from "react";

import "./index.sass";
import logo from "assets/img/logo/logo1.png";

//TODO - CREATE CARDS FOR TOTAL VOTERS, TOTAL CANDIDATE, TOTAL POLLING OFFICERS & TOTAL POLITICAL PARTIES

function AnalyticCard() {
  return <div className={"analyticCard fullWidth"}>
    <div className={"titleContainer clearfix"}>
      <div className="float-left">
        <p className="title poppins">Total Candidates</p>
        <h3 className="numbers mb-0">
          991K
        </h3>
      </div>
      <div className="float-right">
        <img src={logo} className={"analyticsIcon"} alt={"Analytics Name"}/>
      </div>
    </div>
    <div className={"footerContainer"}>
      <p className="text-muted poppins mt-3 mb-0">
        <i className="fas fa-history"/> Last voter created 14:00
      </p>
    </div>
  </div>;
}

export default AnalyticCard;