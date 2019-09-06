import React from "react";

import "./index.sass";
import LinkButton from "components/buttons/react-router-link-button";

export default function BasicModal({ className, title, icon, ...props }) {
  return (
    <div className={"modal"}>
      <div
        className={`modal-overlay ${props.center ? "center" : ""} ${className}`}
      >
        {title ? (
          <div className="clearfix modalTitle o-auto">
            <img
              src={icon}
              className={"registrationIcon mr-3 float-left"}
              alt={"Electoral Officer Registration"}
            />
            <h5 className={"cartogothic boldHeader float-left"}>{title}</h5>
          </div>
        ) : (
          ""
        )}
        {props.children}

        <div className="footer">
          {props.custom ? (
            <ul
              className={
                "no-style d-flex justify-content-around p-0 b-60 mx-auto mt-4 force h-menu"
              }
            >
              <li>
                <LinkButton
                  to={"#"}
                  className={"confirm-background"}
                  onClick={() => props.savePicture()}
                >
                  <i className="fas fa-upload" />
                  Confirm
                </LinkButton>
              </li>
              <li>
                <LinkButton
                  to={"#"}
                  className={"cool-purple-background"}
                  onClick={() => props.redo()}
                >
                  <i className="fas fa-redo" />
                  Take Again
                </LinkButton>
              </li>
              <li>
                <LinkButton
                  to={"#"}
                  className={"reject-background"}
                  onClick={() => props.cancelCallBack()}
                >
                  <i className="fas fa-times" />
                  Cancel
                </LinkButton>
              </li>
            </ul>
          ) : (
            <ul
              className={
                "no-style p-0 fullWidth d-flex justify-content-around mt-4 force h-menu"
              }
            >
              <li>
                <LinkButton
                  to={"#"}
                  className={"confirm-background"}
                  onClick={() => props.confirmCallBack()}
                >
                  {props.confirmText}
                </LinkButton>
              </li>
              <li>
                <LinkButton
                  className={"reject-background"}
                  to={"#"}
                  onClick={() => props.cancelCallBack()}
                >
                  {props.cancelText}
                </LinkButton>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
