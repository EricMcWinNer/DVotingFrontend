import React from "react";

import "./index.sass";

function AnalyticCard({
  title,
  icon,
  number,
  largerIcon,
  subtitle,
  noClock,
  ...props
}) {
  return (
    <div {...props} className={"analyticCard fullWidth"}>
      <div className={"titleContainer d-flex justify-content-between"}>
        <div className="text-container">
          <p className="title poppins">{title}</p>
          <h3 className="numbers mb-0">{number}</h3>
        </div>
        <div className="">
          <img
            src={icon}
            className={`analyticsIcon${largerIcon && " largerIcon"}`}
            alt={"Analytics Name"}
          />
        </div>
      </div>
      <div className={"footerContainer"}>
        <p className="text-muted poppins mt-3 mb-0">
          {!noClock && <i className="fas fa-history" />} {subtitle}
        </p>
      </div>
    </div>
  );
}

export default AnalyticCard;
