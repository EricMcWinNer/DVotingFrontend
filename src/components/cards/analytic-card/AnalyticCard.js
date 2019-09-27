import React from "react";

import "./index.sass";

function AnalyticCard(props) {
  return (
    <div className={"analyticCard fullWidth"}>
      <div className={"titleContainer clearfix"}>
        <div className="float-left text-container">
          <p className="title poppins">{props.title}</p>
          <h3 className="numbers mb-0">{props.number}</h3>
        </div>
        <div className="float-right">
          <img
            src={props.icon}
            className={`analyticsIcon${props.largerIcon && " largerIcon"}`}
            alt={"Analytics Name"}
          />
        </div>
      </div>
      <div className={"footerContainer"}>
        <p className="text-muted poppins mt-3 mb-0">
          {!props.noClock && <i className="fas fa-history" />} {props.subtitle}
        </p>
      </div>
    </div>
  );
}

export default AnalyticCard;
