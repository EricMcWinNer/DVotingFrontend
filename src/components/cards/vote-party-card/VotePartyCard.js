import React from "react";
import "./index.sass";
import BaseCard from "components/cards/base-card";
import foreground from "assets/img/icons/foreground-fingerprint.png";
import Candidates from "./candidate";
import LinkButton from "components/buttons/react-router-link-button";

function VotePartyCard(props) {
  return (
    <div className={"d-flex justify-content-center flex-column"}>
      <BaseCard
        className={`vote-party-card ${
          props.selectedParty === props.party.id ? "selected" : ""
        }`}
        onClick={e => props.handleClick(e, props.party.id)}
        data-acronym={props.party.acronym}
      >
        {/*<div className="candidateContainer fullWidth">{candidates}</div>*/}
        <div className="fullHeight d-flex flex-column fullWidth force">
          <img
            src={`${process.env.REACT_APP_API_PATH}/storage/${props.party.logo}`}
            alt={props.party.name}
            className="party-logo"
          />
          <h2 className="party-acronym">{props.party.acronym}</h2>
        </div>

        <div className="selectedOverlay">
          <img src={foreground} alt={props.party.acronym} />
          <p>{props.party.acronym}</p>
        </div>
        <Candidates
          className={"candidateOverlay"}
          candidates={props.party.candidates}
        />
      </BaseCard>
      {props.selectedParty === props.party.id && (
        <LinkButton
          to={"#"}
          onClick={() => props.triggerConfirmAlert(props.party)}
          medium
          className={"confirm-background text-center center vote-button mt-3"}
        >
          <i className={"fas fa-vote-yea"} />
          Vote Now
        </LinkButton>
      )}
    </div>
  );
}

export default VotePartyCard;
