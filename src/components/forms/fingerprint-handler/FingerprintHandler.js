import React, { PureComponent } from "react";

import "./index.sass";
import fingerprint from "assets/img/icons/fingerprints.png";
import SweetAlert from "react-bootstrap-sweetalert";

class FingerprintHandler extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      template: null,
      timeOut: 10000,
      quality: 80,
      templateFormat: "ISO",
      imageWSQRate: 0.75,
      capturing: false,
      error: false,
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertType: "",
      alertCallBack: null,
      imageDataMatch: null,
      matched: false,
      fingerprintTries: 0,
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.forcefullyclearfingerprints === true) {
      this.clearPrints(this.props.forcefullyshowfingerprints);
    }
    if (
      this.props.leftindex !== undefined &&
      this.props.leftthumb !== undefined &&
      this.props.rightindex !== undefined &&
      this.props.rightthumb !== undefined &&
      this.state.template !== prevState.template &&
      this.state.template !== null
    ) {
      console.log("templates changed");
      this.matchPrints();
    }
    if (
      this.state.matched !== prevState.matched &&
      this.state.matched === true
    ) {
    }
    if (this.state.matched === false && this.state.matchCount === 3) {
      this.displayAlert(
        "Error!",
        "Your fingerprints were not matched successfully",
        "warning"
      );
    }
  }

  clearPrints = callback => {
    this.setState(
      {
        template: null,
        imageData: null,
      },
      () => {
        if ((typeof callback).toLowerCase() === "function") callback();
      }
    );
  };

  displayScanningError = errorcode => {
    if (errorcode === 54) {
      this.displayAlert(
        "Timeout!",
        "The maximum time was elapsed. Ensure the fingerprint reader is clean and try to scan again"
      );
    } else if (errorcode === 55) {
      this.displayAlert(
        "Device not found!",
        "No fingerprint reader was found on this system. Ensure your fingerprint reader is properly connected then try again"
      );
    } else if (errorcode === 59) {
      this.displayAlert(
        "Device busy!",
        "Please wait for a while then try again. If the problem persists unplug the device and connect it then try again"
      );
    } else if (errorcode === 1000) {
      this.displayAlert(
        "No memory!",
        "Your system is currently low on memory. Close other applications and try again."
      );
    } else if (errorcode === 52) {
      this.displayAlert(
        "Sensor chip initialization failed!",
        "The fingerprint reader wasn't properly recognized by your system. Unplug it and try again. If the problem persists, restart your computer and try again."
      );
    } else if (errorcode === 53) {
      this.displayAlert(
        "Sensor line dropped!",
        "The fingerprint reader wasn't properly recognized by your system. Unplug it and try again. If the problem persists, restart your computer and try again."
      );
    } else if (errorcode === 61) {
      this.displayAlert(
        "Unsupported Device",
        "The fingerprint you are using is not supported. Ensure you are using the recommended fingerprint device"
      );
    } else if (
      errorcode === 1 ||
      errorcode === 2 ||
      errorcode === 5 ||
      errorcode === 6 ||
      errorcode === 7 ||
      errorcode === 51
    ) {
      this.displayAlert(
        "Driver files error!",
        "The drivers of your device was not installed properly. Reinstall them and try again."
      );
    }
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  displayAlert = (
    alertTitle,
    alertMessage,
    alertType = "warning",
    alertCallBack = null
  ) => {
    this.setState({
      showAlert: true,
      alertTitle,
      alertMessage,
      alertType,
      alertCallBack,
    });
  };

  closeAlert = () => {
    this.setState({
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertCallBack: null,
    });
  };

  match = (template1, template2, loopNumber) => {
    let uri = "https://localhost:8443/SGIMatchScore";
    let ajax = new XMLHttpRequest();
    let fpobject;
    ajax.onreadystatechange = () => {
      //eslint-disable-next-line
      if (ajax.readyState == 4 && ajax.status == 200) {
        fpobject = JSON.parse(ajax.responseText);
        // console.log(loopNumber, this.state.matched);
        if (fpobject.ErrorCode === 0) {
          console.log(fpobject);
          console.log(loopNumber);
          if (
            loopNumber >= 0 &&
            loopNumber <= 3 &&
            this.state.matched !== true
          ) {
            console.log("AS YOU CAN SEE, I AM HIA");
            if (fpobject.MatchingScore >= 160) {
              this.setState(
                state => ({
                  imageData: state.imageDataMatch,
                  capturing: false,
                  error: false,
                  matched: true,
                  fingerprintTries: 0,
                }),
                () => {
                  this.props.callback(template2);
                }
              );
              this.displayAlert(
                "Success!",
                "Your fingerprint was verified successfully",
                "success"
              );
            } else {
              this.setState(
                {
                  error: true,
                  capturing: false,
                  template: null,
                  imageData: null,
                  matched: false,
                },
                () => {
                  this.props.callback(this.state.template);
                  console.log(this.state.fingerprintTries);
                  if (loopNumber === 3)
                    this.displayAlert(
                      "Error!",
                      "Your fingerprint did not match what we have in our records. Place your finger properly on the fingerprint, ensure the scanner is clean and try again.",
                      "error"
                    );
                  if (this.state.fingerprintTries === 4) {
                    this.displayAlert(
                      "Error!",
                      "You have matched your fingerprint incorrectly 4 times in a row. You will be logged out now",
                      "error",
                      this.props.logOut
                    );
                  }
                }
              );
            }
          }
        } else {
          this.setState(
            {
              error: true,
              capturing: false,
              template: null,
              imageData: null,
              matched: null,
            },
            () => {
              this.props.callback(this.state.template);
            }
          );
          this.displayScanningError(fpobject.ErrorCode);
          if (loopNumber === 3) {
            this.setState(state => ({
              fingerprintTries: state.fingerprintTries - 1,
            }));
          }
        }
      }
      //eslint-disable-next-line
      else if (ajax.status == 404) {
        this.displayAlert(
          "Secugen Service Not Found",
          "In order for this system to work, you need to download and install the Secugen service"
        );
        this.setState({ matched: null });
        if (loopNumber === 3) {
          this.setState(state => ({
            fingerprintTries: state.fingerprintTries - 1,
          }));
        }
      }
    };
    ajax.onerror = () => {
      this.displayAlert(
        "Something went wrong",
        "Please try again later, we are currently working on resolving the issue"
      );
      this.setState({ matched: null });
      if (loopNumber === 3) {
        this.setState(state => ({
          fingerprintTries: state.fingerprintTries - 1,
        }));
      }
    };
    let params = "template1=" + encodeURIComponent(template1);
    params += "&template2=" + encodeURIComponent(template2);
    params += "&templateFormat=" + this.state.templateFormat;
    ajax.open("POST", uri, true);
    ajax.send(params);
  };

  matchPrints = () => {
    this.setState(state => ({
      matched: false,
      fingerprintTries: state.fingerprintTries + 1,
    }));
    const prints = [
      this.props.rightthumb,
      this.props.rightindex,
      this.props.leftthumb,
      this.props.leftindex,
    ];
    for (var i = 0; i < prints.length; i++) {
      this.match(prints[i], this.state.template, i);
    }
  };

  capture = () => {
    this.setState({ capturing: true, error: false });
    let fpobject, uri;
    uri = "https://localhost:8443/SGIFPCapture";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      //eslint-disable-next-line
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        fpobject = JSON.parse(xmlhttp.responseText);
        console.log(fpobject);
        if (fpobject.ErrorCode === 0) {
          if (
            this.props.leftindex === undefined &&
            this.props.leftthumb === undefined &&
            this.props.rightindex === undefined &&
            this.props.righthumb === undefined
          )
            this.setState(
              {
                imageData: fpobject.BMPBase64,
                template: fpobject.TemplateBase64,
                capturing: false,
                error: false,
              },
              () => {
                this.props.callback(this.state.template);
              }
            );
          else {
            this.setState({
              template: fpobject.TemplateBase64,
              imageDataMatch: fpobject.BMPBase64,
            });
          }
        } else {
          this.setState(
            {
              error: true,
              capturing: false,
              template: null,
              imageData: null,
            },
            () => {
              this.props.callback(this.state.template);
            }
          );
          this.displayScanningError(fpobject.ErrorCode);
        }
        //eslint-disable-next-line
      } else if (xmlhttp.status == 404) {
        this.displayAlert(
          "Secugen Service Not Found",
          "In order for this system to work, you need to download and install the Secugen service"
        );
      }
    };
    var params = "Timeout=" + this.state.timeOut;
    params += "&Quality=" + this.state.quality;
    params += "&templateFormat=" + this.state.templateFormat;
    params += "&imageWSQRate=" + this.state.imageWSQRate;
    xmlhttp.open("POST", uri, true);
    xmlhttp.send(params);
    xmlhttp.onerror = () => {
      this.displayAlert(
        "Something went wrong",
        "Please try again later, we are currently working on resolving the issue"
      );
    };
  };

  render() {
    const {
      label,
      className,
      defaultTemplate,
      icon,
      forcefullyclearfingerprints,
      forcefullyshowfingerprints,
      callback,
      logOut,
      ...props
    } = this.props;
    return (
      <div
        {...props}
        className={`fingerprintElementContainer fullWidth${
          className ? ` ${className}` : ""
        }`}
      >
        {this.state.imageData !== null && (
          <img
            src={`data:image/bmp;base64,${this.state.imageData}`}
            className={"image-preview mb-4"}
            alt={"Fingerprint preview"}
          />
        )}
        <div
          onClick={this.capture}
          className={`fingerprintElement${
            this.state.capturing ? " capturing" : ""
          }${
            this.state.matched === true
              ? " captured"
              : this.state.template === null
              ? ""
              : " captured"
          }
          ${this.state.error ? " error" : ""}`}
        >
          <img
            src={!icon ? fingerprint : icon}
            alt={
              this.props.leftindex === undefined &&
              this.props.leftthumb === undefined &&
              this.props.rightindex === undefined &&
              this.props.rightthumb === undefined
                ? "Capture fingerprint"
                : "Match fingerprint"
            }
          />
          <p>{label}</p>
        </div>
        {this.state.showAlert && (
          <SweetAlert
            type={this.state.alertType}
            allowEscape
            closeOnClickOutside
            title={this.state.alertTitle}
            onConfirm={
              (typeof this.state.alertCallBack).toLowerCase() === "function"
                ? this.state.alertCallBack
                : this.closeAlert
            }
            cancelBtnBsStyle="default"
            onCancel={this.state.closeAlert}
          >
            <span className="cartogothic">{this.state.alertMessage}</span>
          </SweetAlert>
        )}
      </div>
    );
  }
}

export default FingerprintHandler;
