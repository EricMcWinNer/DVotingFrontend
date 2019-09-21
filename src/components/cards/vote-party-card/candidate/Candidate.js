import React from "react";
import "./index.sass";
import BaseCard from "components/cards/base-card";
import { capitalize } from "utils/helpers";
import IconBadge from "components/badges/icon-badge/IconBadge";
import candidate from "assets/img/icons/totalcandidates.png";

function Candidate({ candidates, ...props }) {
  candidates = candidates.map((candidate, index) => (
    <div className={"candidate"}>
      <div className="candidate-info">
        <div>
          <img
            src={`${process.env.REACT_APP_API_PATH}/storage/${candidate.candidate_picture}`}
            alt={candidate.name}
            className={"candidate-campaign-picture"}
          />
        </div>
        <div className="candidate-name">
          <h3>{candidate.name}</h3>
          <div className="candidate-role">
            <IconBadge className={candidate.role} fixedWidth={70}>
              {capitalize(candidate.role)}
            </IconBadge>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <BaseCard className={"candidates-component"} {...props}>
      {candidates}
    </BaseCard>
  );
}

export default Candidate;
