import React, { Component } from "react";

class PictureUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: null,
      pictureFile: null
    };
  }

  componentDidMount() {
    this._mounted = true;
    if (this.props.defaultPictureUrl !== undefined)
      this.setState({ pictureUrl: this.props.defaultPictureUrl });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handlePictureChange = e => {
    this.readURI(e);
  };

  dismissImageAlert = () => {
    if (this._mounted)
      this.setState({
        fileNotImage: false
      });
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
          this.props.updatePictureFile(e.target.files[0]);
          let reader = new FileReader();
          //TODO WRITE CODE TO CHECK FOR ASPECT RATIO ON FRONTEND
          reader.onload = function(ev) {
            this.setState({
              pictureUrl: ev.target.result,
              fileNotImage: false
            });
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        } else {
          this.setState({ fileNotImage: true, pictureUrl: null });
        }
      }
  };

  render() {
    return (
      <div className="fullWidth inputGroup">
        <label htmlFor="candidatePicture">{this.props.label}</label>
        {this.state.pictureUrl === null ? (
          <div />
        ) : (
          <div id={"imagePreview"} className={"b-100"}>
            <img
              src={this.state.pictureUrl}
              alt={this.props.label}
              className={"uploadedImage-Preview"}
            />
          </div>
        )}
        <input
          type={"file"}
          id={"candidatePicture"}
          name={"candidatePicture"}
          className={"basecard-input"}
          accept="image/*"
          placeholder={"Candidate Picture"}
          onChange={e => this.handlePictureChange(e)}
        />
      </div>
    );
  }
}

export default PictureUploadInput;
