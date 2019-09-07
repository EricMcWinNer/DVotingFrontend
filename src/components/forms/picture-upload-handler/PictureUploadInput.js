import React, { Component } from "react";
import Webcam from "react-webcam";
import upload from "assets/img/icons/photo-upload.png";
import webcam from "assets/img/icons/webcam.png";
import BasicModal from "components/cards/basic-modal";
import "./index.sass";

class PictureUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: null,
      pictureFile: null,
      showWebcam: false,
      webCamPicture: null,
      previewWebCamPicture: false,
      webCamWidth: 0,
      webCamHeight: 0,
    };
    this.pictureUploadRef = React.createRef();
  }

  componentDidMount() {
    this._mounted = true;
    if (this.props.defaultPictureUrl !== undefined)
      this.setState({ pictureUrl: this.props.defaultPictureUrl });
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.forcefullyShowPreview();
    this.setState({ webCamPicture: imageSrc, previewWebCamPicture: true });
  };

  takeAgain = () => {
    this.setState({ webCamPicture: null, previewWebCamPicture: false });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.webCamWidth !== this.props.webCamWidth)
      this.setState({ webCamWidth: this.props.webCamWidth }, () => {
        this.calculateWebCamHeight();
      });
  }

  calculateWebCamHeight = () => {
    const width = window.outerWidth - (window.outerWidth / 100) * 30;
    const aspectRatio = window.outerWidth / window.outerHeight;
    const height = width / aspectRatio;
    console.log(window.innerWidth, width);
    console.log(aspectRatio, "Aspect Ratio");
    console.log(height, "Height");
    this.setState({ webCamWidth: width, webCamHeight: height });
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  handlePictureChange = e => {
    this.readURI(e);
  };

  dismissImageAlert = () => {
    if (this._mounted)
      this.setState({
        fileNotImage: false,
      });
  };

  displayWebcam(status = true) {
    if (this._mounted) {
      this.videoConstraints = {
        width: this.state.webCamWidth,
        height: this.state.webCamHeight,
        facingMode: "user",
      };
      this.setState({ showWebcam: status });
    }
  }

  cancelPicture = () => {
    this.props.updatePictureFile(null);
    this.setState({
      pictureUrl: null,
      pictureFile: null,
      webCamPicture: null,
    });
    this.pictureUploadRef.current.value = null;
  };

  saveCapturedPicture = () => {
    this.setState({
      showWebcam: false,
      previewWebCamPicture: false,
    });
    this.setState({
      pictureUrl: this.state.webCamPicture,
      pictureFile: this.state.webCamPicture,
    });
    this.props.updatePictureFile(this.state.webCamPicture);
  };

  readURI = e => {
    const fileTypes = ["jpg", "jpeg", "png"];
    if (this._mounted)
      if (e.target.files && e.target.files[0]) {
        const extension = e.target.files[0].name
            .split(".")
            .pop()
            .toLowerCase(), //file extension from input file
          isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
        if (isSuccess) {
          this.setState({ pictureFile: e.target.files[0] });
          this.props.forcefullyShowPreview();
          this.props.updatePictureFile(e.target.files[0]);
          let reader = new FileReader();
          //TODO WRITE CODE TO CHECK FOR ASPECT RATIO ON FRONTEND
          reader.onload = function(ev) {
            this.setState({
              pictureUrl: ev.target.result,
              fileNotImage: false,
            });
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        } else {
          this.setState({ fileNotImage: true, pictureUrl: null });
        }
      }
  };

  removeWebCam = () => {
    this.setState({
      showWebcam: false,
      previewWebCamPicture: false,
      webCamPicture: null,
    });
  };

  render() {
    return (
      <div className="fullWidth pictureUploadWrapper inputGroup">
        <label
          htmlFor="pictureUpload"
          className={`${this.props.required ? "required" : ""}`}
        >
          {this.props.label}
        </label>
        {this.props.forcefullyRemovePreview ||
        this.state.pictureUrl === null ? (
          <div />
        ) : (
          <div id={"imagePreview"} className={"b-100"}>
            <img
              src={this.state.pictureUrl}
              alt={this.props.label}
              className={"uploadedImage-Preview"}
            />
            {this.props.fancyInput && (
              <div onClick={() => this.cancelPicture()} className={"cancel"}>
                Cancel
              </div>
            )}
          </div>
        )}
        {this.state.showWebcam && (
          <BasicModal
            center
            icon={webcam}
            title={"Take a Profile Picture"}
            className={"b-80 l-90"}
            custom={this.state.previewWebCamPicture}
            redo={this.takeAgain}
            cancelText={
              <span>
                <i className="fas fa-times" /> Cancel
              </span>
            }
            savePicture={this.saveCapturedPicture}
            confirmText={
              <span>
                <i className="fas fa-camera" /> Capture
              </span>
            }
            confirmCallBack={this.capture}
            cancelCallBack={this.removeWebCam}
          >
            {this.state.previewWebCamPicture ? (
              <div className="fullWidth">
                <img
                  src={this.state.webCamPicture}
                  alt="Preview Webcam picture"
                  className={"d-block mx-auto"}
                  width={this.state.webCamWidth}
                />
              </div>
            ) : (
              <Webcam
                audio={false}
                height={this.state.webCamHeight}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={this.state.webCamWidth}
                videoConstraints={this.videoConstraints}
                className={"mx-auto d-block"}
                style={{ width: this.state.webCamWidth }}
              />
            )}
          </BasicModal>
        )}
        <div className="uploadInputWrapper">
          <div className={`${this.props.fancyInput && "upload-picture-label"}`}>
            <img src={upload} alt={"Click or drag and drop here"} />
            Click or drag and drop here
            <div className={"label-overlay"}>
              <input
                type={"file"}
                id={"pictureUpload"}
                name={"pictureUpload"}
                className={`basecard-input ${
                  this.props.fancyInput ? "invisible-input" : ""
                }`}
                accept="image/*"
                onChange={e => this.handlePictureChange(e)}
                required={this.props.required}
                ref={this.pictureUploadRef}
              />
            </div>
          </div>
          {this.props.useWebcam && (
            <div
              className={`upload-picture-label`}
              onClick={() => this.displayWebcam()}
            >
              <img src={webcam} alt={"Take a picture with webcam"} />
              Take a picture with webcam
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PictureUploadInput;
