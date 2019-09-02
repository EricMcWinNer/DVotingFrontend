import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "react-helmet";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import candidates from "assets/img/icons/totalcandidates.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import PictureUploadInput from "components/forms/picture-upload-handler";
import BrokenLinkCard from "components/cards/broken-link-card/BrokenLink";
import SweetAlert from "react-bootstrap-sweetalert";

function CreateCandidateFormView(props) {
  const userManager = props.userManager;
  let partyOptions;
  if (!props.componentIsLoading && props.prospectiveCandidate !== null) {
    partyOptions = props.parties.map(party => (
      <option key={party.id} data-logo={party.logo} value={party.id}>
        {party.name}
      </option>
    ));
  }
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : props.prospectiveCandidate === null ? (
    <BrokenLinkCard />
  ) : (
    <Row id={"createCandidate"}>
      <Helmet>
        <title>{process.env.REACT_APP_NAME} | Create New Candidate </title>
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
              <p className={"title"}>Create Candidate</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can register a new candidate in the application.
            Edit the form below to make the selected user a candidate.
          </p>
          <form
            id={"candidateCreationForm"}
            onSubmit={e => props.handleSubmit(e)}
            className={"poppins"}
          >
            <div className="fullWidth inputGroup">
              <label htmlFor={"electionName"}>Candidate Picture:</label>
              <img
                src={`${process.env.REACT_APP_API_PATH}/storage/${props.prospectiveCandidate.picture}`}
                alt={props.prospectiveCandidate.name}
                className={"candidate-original-picture"}
              />
            </div>
            <div className="fullWidth inputGroup">
              <label htmlFor={"electionName"}>Candidate Name:</label>
              <input
                id={"electionName"}
                type="text"
                name={"electionName"}
                value={props.prospectiveCandidate.name}
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
                className={"float-right cartogothic reject-background"}
                to={"/dashboard/candidates"}
              >
                <i className="fas fa-chevron-left" />
                Back to Candidates
              </LinkButton>
            </div>
          </form>
          {userManager.isOfficial() &&
            !props.componentIsLoading &&
            props.showErrorAlert && (
              <SweetAlert
                type={props.alertType}
                allowEscape
                closeOnClickOutside
                title={props.errorTitle}
                onConfirm={
                  (typeof props.alertCallBack).toLowerCase() === "function"
                    ? props.alertCallBack
                    : props.closeErrorModal
                }
                onCancel={props.closeErrorModal}
              >
                <span className="cartogothic">{props.errorMessage}</span>
              </SweetAlert>
            )}
        </BaseCard>
      </Col>
    </Row>
  );
}

export default CreateCandidateFormView;
