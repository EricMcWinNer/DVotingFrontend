import React from "react";

import "./index.sass";
import SweetAlert from "react-bootstrap-sweetalert";
import FingerprintMatcher from "components/forms/fingerprint-handler";

function VerifyIdentityView(props) {
  return (
    <div>
      <form
        action="#"
        onSubmit={e => props.handleSubmit(e)}
        className={"poppins"}
      >
        <div className="fullWidth inputGroup">
          <label htmlFor={"password"}>Enter your password:</label>
          <input
            id={"password"}
            type="password"
            name={"password"}
            placeholder={"Enter your password"}
            value={props.password}
            className={"basecard-input"}
            onChange={props.handleChange}
          />
          <div className={"fingerprintContainer mt-4"}>
            <label htmlFor={"password"}>Scan your fingerprint:</label>
            <FingerprintMatcher
              className={"noCenter"}
              leftindex={props.leftIndex}
              leftthumb={props.leftThumb}
              rightindex={props.rightIndex}
              rightthumb={props.rightThumb}
              label={"Verify fingerpint"}
              callback={props.updateTemplate}
              logOut={props.logOut}
            />
          </div>
          <div className="fullWidth mt-3 clearfix">
            <button type={"submit"} className={"submitForm"}>
              {props.formSubmitting ? (
                <i className="fas fa-spinner fa-pulse" />
              ) : (
                <>
                  <i className="far mr-2 fa-save" />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      {props.showErrorAlert && (
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
          cancelBtnBsStyle="default"
          onCancel={props.closeErrorModal}
        >
          <span className="cartogothic">{props.errorMessage}</span>
        </SweetAlert>
      )}
    </div>
  );
}

export default VerifyIdentityView;
