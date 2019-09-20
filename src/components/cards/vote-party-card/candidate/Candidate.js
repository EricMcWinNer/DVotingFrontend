import React from "react";
import "./index.sass";
import BaseCard from "components/cards/base-card";
import { capitalize } from "utils/helpers";
import IconBadge from "components/badges/icon-badge/IconBadge";

function Candidate(props) {
  return (
    <div className={"candidate-component"}>
      <img
        src={`${process.env.REACT_APP_API_PATH}/storage/${props.candidate.candidate_picture}`}
        alt={props.candidate.name}
      />
      <BaseCard className="candidate-info">
        <img
          src={`${process.env.REACT_APP_API_PATH}/storage/${props.candidate.candidate_picture}`}
          alt={props.candidate.name}
          className={"info-picture"}
        />
        <h2>{props.candidate.name}</h2>
        <IconBadge className={props.candidate.role} fixedWidth={70}>
          {capitalize(props.candidate.role)}
        </IconBadge>
      </BaseCard>
    </div>
  );
}

export default Candidate;
