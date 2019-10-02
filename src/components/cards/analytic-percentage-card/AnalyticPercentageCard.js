import React from "react";
import ProgressBar from "react-progressbar-semicircle";
import "./index.sass";
import BaseCard from "components/cards/base-card";

function AnalyticPercentageCard({
  className,
  percentage,
  title,
  progressColor,
  noPercent,
  subtitle,
  ...props
}) {
  return (
    <BaseCard
      {...props}
      className={`analytic-percentage-card${className ? ` ${className}` : ""}`}
    >
      <div className={"d-flex flex-row"}>
        <ProgressBar
          className={"cartogothic"}
          stroke={progressColor}
          diameter={70}
          strokeWidth={10}
          showPercentValue
          percentage={percentage}
        />
        <p className={"title cartogothic"}>{title}</p>
      </div>
      <div className={"footerContainer"}>
        <p className="text-muted poppins mt-3 mb-0">
          {!noPercent && <i class="fas fa-percentage" />} {subtitle}
        </p>
      </div>
    </BaseCard>
  );
}

export default AnalyticPercentageCard;
