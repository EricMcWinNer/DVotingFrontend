import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

function ErrorAlert({ state, ...props }) {
  return state.showAjaxAlert && (
    <SweetAlert
      type={state.ajaxAlertType}
      allowEscape
      closeOnClickOutside
      title={state.ajaxAlertTitle}
      onConfirm={
        (typeof state.ajaxAlertCallback).toLowerCase() === "function"
          ? state.ajaxAlertCallback
          : state.closeAjaxAlert
      }
      onCancel={state.closeAjaxAlert}
      showCancel={state.ajaxShowCancel}
      confirmBtnText={state.ajaxConfirmText ? state.ajaxConfirmText : "Ok"}
      cancelBtnText={state.ajaxCancelText ? state.ajaxCancelText : "Cancel"}
    >
      <span className="cartogothic">{state.ajaxAlertMessage}</span>
    </SweetAlert>
  )
}

export default ErrorAlert;
