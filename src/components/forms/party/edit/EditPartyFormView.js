import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Col from "react-bootstrap/Col";
import BaseCard from "components/cards/base-card";
import createIcon from "assets/img/icons/create.png";
import LinkButton from "components/buttons/react-router-link-button/ReactRouterLinkButton";
import Alert from "react-bootstrap/Alert";
import BrokenLink from "components/cards/broken-link-card";
import BrokenLinkCard from "components/cards/broken-link-card/BrokenLink";
import Helmet from "react-helmet";

function EditPartyFormView(props) {
  const [show, setShow] = useState(props.fileNotImage);
  return (
    <Row id={"editPartyForm"}>
      {props.componentIsLoading ? (
        <SubRouteLoader />
      ) : props.party === null ? (
        <Col md={{ span: 8, offset: 1 }}>
          <BrokenLinkCard />
        </Col>
      ) : (
        <Col md={{ span: 8, offset: 1 }}>
          <BaseCard>
            <Helmet>
              <title>
                {process.env.REACT_APP_NAME} | Edit{" "}
                {props.acronym.toUpperCase()}
              </title>
            </Helmet>
            <div className="title clearfix o-auto">
              <div className="float-left">
                <img
                  src={createIcon}
                  alt="Create Political Party"
                  className={"title-icon small"}
                />
              </div>
              <div className="float-left">
                <p className={"title"}>Edit Political Party</p>
              </div>
            </div>
            <p className="subtitle poppins">
              Please fill in the form below with the correct values to edit the
              political party
            </p>
            <form
              id={"electionCreationForm"}
              onSubmit={e => props.handleSubmit(e)}
              className={"poppins"}
            >
              <div className="fullWidth inputGroup">
                <label htmlFor={"partyName"}>Party Full Name:</label>
                <input
                  id={"partyName"}
                  type="text"
                  name={"partyName"}
                  value={props.partyName}
                  onChange={props.onChange}
                  placeholder={"e.g People's Democratic Party"}
                />
              </div>
              <div className="fullWidth inputGroup">
                <label htmlFor="acronym">Acronym:</label>
                <input
                  id={"acronym"}
                  type="text"
                  name={"acronym"}
                  value={props.acronym.toUpperCase()}
                  onChange={props.onChange}
                  maxLength={6}
                  placeholder={"e.g PDP"}
                />
              </div>
              <div className="fullWidth inputGroup">
                <label htmlFor="partyLogo">Party Logo:</label>
                {props.partyLogoURL === null ? (
                  <div />
                ) : (
                  <div id={"imagePreview"} className={"b-100"}>
                    <img src={props.partyLogoURL} alt={"Preview Party Logo"} />
                  </div>
                )}
                <input
                  type={"file"}
                  id={"partyLogo"}
                  name={"partyLogo"}
                  accept="image/*"
                  placeholder={"Party Logo"}
                  onChange={e => props.handlePartyLogo(e)}
                />
              </div>
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
                  to={"/dashboard/party"}
                >
                  <i className="fas fa-chevron-left" />
                  Back to Parties
                </LinkButton>
              </div>
            </form>
          </BaseCard>
          <div className={"fixed-top"}>
            {props.fileNotImage ? (
              <Alert
                variant="danger"
                onClose={() => {
                  setShow(false);
                  props.dismissImageAlert();
                }}
                dismissible
              >
                <Alert.Heading>Uploaded File is not an Image</Alert.Heading>
                <p>
                  The profile picture uploaded is not an image, change the file
                  and try again
                </p>
              </Alert>
            ) : (
              <div />
            )}
          </div>
        </Col>
      )}
    </Row>
  );
}

export default EditPartyFormView;
