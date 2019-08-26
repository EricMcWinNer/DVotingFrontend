import React from "react";

import "./index.sass";
import BaseCard from "components/cards/base-card";
import SubRouteLoader from "components/loaders/dashboard-sub-route/DashboardSubRouteLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helmet from "react-helmet";
import officials from "assets/img/icons/official.png";

function OfficialHomeRouteView(props) {
  return props.componentIsLoading ? (
    <SubRouteLoader />
  ) : (
    <Row id={"candidates"}>
      <Col md={12}>
        <BaseCard>
          <Helmet>
            <title>{process.env.REACT_APP_NAME} | View Officials</title>
          </Helmet>
          <div className="title clearfix o-auto">
            <div className="float-left">
              <img
                src={officials}
                alt="No parties found"
                className={"title-icon small"}
              />
            </div>
            <div className="float-left">
              <p className={"title"}>Officials</p>
            </div>
          </div>
          <p className="subtitle poppins">
            In this section you can view and manage all the officials registered
            in the application
          </p>
        </BaseCard>
      </Col>
    </Row>
  );
}

export default OfficialHomeRouteView;
