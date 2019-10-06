const ErrorMessage = Object.freeze({
  zero: {
    title: "Error!",
    message:
      "Something went wrong. Please check your internet connection and click the button to try again",
    btnText: "Try again",
  },
  fourohthree: {
    title: "403 - Forbidden",
    message:
      "Sorry, you are not authorized to perform that action. You will be redirected to the dashboard home",
    btnText: "Back to dashboard home",
  },
  thefault: {
    title: "Something went wrong!",
    message:
      "It's not you, it's us. We're working on it at the moment so check back later.",
    btnText: "Back to dashboard home",
  },
});

export const initialAjaxAlertState = {
  showAjaxAlert: false,
  ajaxErrorCode: null,
  ajaxErrorCallback: null,
  ajaxAlertType: null,
  ajaxAlertTitle: null,
  ajaxAlertMessage: null,
  ajaxAlertCallback: null,
  ajaxConfirmText: null,
  ajaxCancelText: null,
  ajaxShowCancel: false,
};

export const showAjaxAlert = (
  that,
  type,
  title,
  message,
  callback = null,
  ajaxConfirmText = null,
  ajaxCancelText = null,
  ajaxShowCancel = false
) => {
  that.setState({
    showAjaxAlert: true,
    ajaxAlertType: type ? type : "error",
    ajaxAlertTitle: title,
    ajaxAlertMessage: message,
    ajaxAlertCallback: callback,
    ajaxConfirmText,
    ajaxCancelText,
    ajaxShowCancel,
  });
};

export const closeAjaxAlert = that => {
  that.setState({
    showAjaxAlert: false,
    ajaxAlertType: null,
    ajaxAlertTitle: null,
    ajaxAlertMessage: null,
    ajaxAlertCallback: null,
    ajaxConfirmText: null,
    ajaxCancelText: null,
    ajaxShowCancel: false,
  });
};

export const fireAjaxErrorAlert = (
  that,
  status,
  callback = null,
  reload = true
) => {
  switch (status) {
    case 0:
      showAjaxAlert(
        that,
        "error",
        ErrorMessage.zero.title,
        ErrorMessage.zero.message,
        () => {
          if (callback) {
            closeAjaxAlert(that);
            callback();
          } else {
            if (reload) window.location.reload();
            else closeAjaxAlert(that);
          }
        },
        ErrorMessage.btnText
      );
      break;
    case 403:
      showAjaxAlert(
        that,
        "error",
        ErrorMessage.fourohthree.title,
        ErrorMessage.fourohthree.message,
        () => {
          that.props.updateUser();
          closeAjaxAlert(that);
          if (that.props.location.pathname === "/dashboard")
            window.location.reload();
          else that.props.history.push("/dashboard");
        },
        ErrorMessage.btnText
      );
      break;
    default:
      showAjaxAlert(
        that,
        "error",
        ErrorMessage.thefault.title,
        ErrorMessage.thefault.message,
        () => {
          if (callback) callback();
          else {
            if (reload) {
              closeAjaxAlert(that);
              that.props.history.push("/dashboard");
              if (that.props.location.pathname === "/dashboard")
                window.location.reload();
              else that.props.history.push("/dashboard");
            } else closeAjaxAlert(that);
          }
        },
        ErrorMessage.btnText
      );
      break;
  }
};
