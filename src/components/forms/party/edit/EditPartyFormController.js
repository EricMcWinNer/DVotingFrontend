import React, { Component } from "react";
import axios from "axios";

import "./index.sass";
import EditPartyFormView from "./EditPartyFormView";
import CreatePartyFormView from "components/forms/party/create/CreatePartyFormView";

class EditPartyFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsLoading: true,
      party: null,
      partyName: "",
      acronym: "",
      partyLogoURL: null,
      partyLogoFile: null,
      fileNotImage: false,
      formIsSubmitting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    //TODO UPDATE THIS CODE TO HANDLE PROPER USER VALIDATION
    axios.defaults.withCredentials = true;
    axios(
      `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}`,
      {
        method: "get"
      }
    ).then(res => {
      if (res.data.isSessionValid == "false") {
        this.props.history.push("/login");
      } else {
        this.setState({
          componentIsLoading: false,
          party: res.data.party
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.party !== null && prevState.party === null)
      this.setState({
        partyName: this.state.party.name,
        acronym: this.state.party.acronym,
        partyLogoURL: `${process.env.REACT_APP_API_PATH}/storage/${this.state.party.logo}`
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleChange = e => {
    let { name, value, type, tagName } = e.target;
    if (
      type === "text" ||
      type === "password" ||
      type === "email" ||
      tagName.toLowerCase() === "select" ||
      type === "date"
    ) {
      this.setState({
        [name]: value
      });
    }
  };

  handlePartyLogo = e => {
    this.readURI(e);
  };

  dismissImageAlert = () => {
    if (this._mounted)
      this.setState({
        fileNotImage: false
      });
  };

  readURI(e) {
    const fileTypes = ["jpg", "jpeg", "png"];
    if (this._mounted)
      if (e.target.files && e.target.files[0]) {
        const extension = e.target.files[0].name
            .split(".")
            .pop()
            .toLowerCase(), //file extension from input file
          isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
        if (isSuccess) {
          this.setState({ partyLogoFile: e.target.files[0] });
          let reader = new FileReader();
          //TODO WRITE CODE TO CHECK FOR ASPECT RATIO ON FRONTEND
          reader.onload = function(ev) {
            this.setState({
              partyLogoURL: ev.target.result,
              fileNotImage: false
            });
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        } else {
          this.setState({ fileNotImage: true, partyLogoURL: null });
        }
      }
  }

  handleSubmit = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true });
      axios.defaults.withCredentials = true;
      let formData = new FormData();
      formData.append("partyName", this.state.partyName);
      formData.append("acronym", this.state.acronym);
      formData.append("partyLogo", this.state.partyLogoFile);
      axios(
        `${process.env.REACT_APP_API_PATH}/api/dashboard/party/${this.props.match.params.id}/edit`,
        {
          method: "post",
          data: formData
        }
      ).then(res => {
        if (res.data.isSessionValid == "false") {
          this.props.history.push("/login");
        } else {
          this.setState({
            formIsSubmitting: false
          });
          if (res.data.completed === true) {
            alert("Political party updated successfully");
            this.props.history.push("/dashboard/party");
          }
        }
      });
    }
  };

  render() {
    return (
      <EditPartyFormView
        handlePartyLogo={this.handlePartyLogo}
        onChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default EditPartyFormController;
