import React from "react";
import Helmet from "react-helmet";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.sass";
import SubRouteLoader from "components/loaders/dashboard-sub-route/";
import BaseCard from "components/cards/base-card";
import candidates from "assets/img/icons/totalcandidates.png";
import PictureUploadInput from "components/forms/picture-upload-handler";
import LinkButton from "components/buttons/react-router-link-button";
import BrokenLinkCard from "components/cards/broken-link-card";

function EditCandidateFormView(props) {
  let partyOptions;

  if (!props.componentIsLoading && props.candidate !== null) {
    partyOptions = props.parties.map(party => (
      <option key={party.id} data-logo={party.logo} value={party.id}>
        {party.name}
      </option>
    ));
  }

  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.candidate === null ? (
    <BrokenLinkCard />
  ) : (
    <Row id={"editCandidate"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Edit Candidate </title>
      </Helmet>
      <Col md={{ span: 8, offset: 1 }}>
        <BaseCard id={"nullCard"}>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={candidates}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Edit Candidate</p>
            </div>
          </div>
          <p className="subtitle poppins">
            Fill in the form with the correct information to edit the
            candidate's information.
          </p>
          <form
            id={"candidateCreationForm"}
            onSubmit={e => props.handleSubmit(e)}
            className={"poppins"}
          >
            <div className="fullWidth inputGroup">
              <label htmlFor={"electionName"}>Candidate Name:</label>
              <input
                id={"electionName"}
                type="text"
                name={"electionName"}
                value={props.candidate.name}
                className={"basecard-input"}
                disabled
              />
            </div>
            <div className="fullWidth inputGroup">
              <label htmlFor="startDate">Campaigning Position:</label>
              <select
                name={"role"}
                className={"custom-select basecard-select"}
                onChange={e => props.handleChange(e)}
                value={props.role}
                id={"role"}
              >
                <option value={""}>Select a position</option>
                <option value={"President"}>President</option>
                <option value={"Vice-President"}>Vice-president</option>
              </select>
            </div>
            <div className="fullWidth inputGroup">
              <label htmlFor="endDate">Political party:</label>
              <select
                name={"selectedParty"}
                id={"selectedParty"}
                className={"custom-select basecard-select"}
                value={props.selectedParty}
                onChange={e => props.handlePartyChange(e)}
              >
                <option value={""} data-logo={""}>
                  Select a party
                </option>
                {partyOptions}
              </select>
              {props.selectedPartyLogo !== "" && (
                <img
                  alt={"Party logo"}
                  src={`${process.env.REACT_APP_API_PATH}/storage/${props.selectedPartyLogo}`}
                  className={"partyLogoPreview"}
                />
              )}
            </div>
            <PictureUploadInput
              defaultPictureUrl={`${process.env.REACT_APP_API_PATH}/storage/${props.candidate.candidate_picture}`}
              label={"Candidate's campaign Picture"}
              updatePictureFile={props.updateCampaignPicture}
            />
            <div className="fullWidth clearfix">
              <button type={"submit"} className={"submitForm"}>
                {props.formIsSubmitting ? (
                  <i className="fas fa-spinner fa-pulse" />
                ) : (
                  <>
                    <i className="far mr-2 fa-save" />
                    Submit
                  </>
                )}
              </button>
              <LinkButton
                className={"float-right cartogothic"}
                backgroundColor={"#B5400C"}
                to={"/dashboard/candidates"}
              >
                <i className="fas fa-chevron-left" />
                Back to Candidates
              </LinkButton>
            </div>
          </form>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default EditCandidateFormView;
