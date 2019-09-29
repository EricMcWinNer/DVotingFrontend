import React from "react";
import logo from "assets/img/logo/logo1.png";
import notFoundImage from "assets/img/dashboard/232.jpg";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./index.sass";

function NotFoundPage(props) {
  return (
    <div id={"not-found"}>
      <div className={"nav-404"}>
        <Link to={"/dashboard"}>
          <img src={logo} alt={process.env.REACT_APP_NAME} className={"logo"} />
          <span>{process.env.REACT_APP_NAME}</span>
        </Link>
      </div>
      <Container>
        <div className={"grid-wrapper"}>
          <div className={"grid-container"}>
            <div>
              <div className={"text-404"}>
                <h2>We can't find this page</h2>
                <p>
                  The page you're looking for has either been moved or never
                  existed.
                </p>
                <p>Please click the link below to return to your dashboard.</p>
                <div className={"fullWidth mt-4"}>
                  <Link className={"back-home"} to={"/dashboard"}>
                    <i className={"fas fa-arrow-left"} />
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <img
                src={notFoundImage}
                className={"fullWidth"}
                alt={"Not Found"}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
