import React, { Component } from "react";
import axios from "axios";

import CreateElectionFormView from "./CreateElectionFormView";

class CreateElectionFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electionName: "",
      startDate: "",
      endDate: "",
      formIsSubmitting: false
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleStartDateChange = startDate => {
    this.setState({ startDate });
  };
  handleEndDateChange = endDate => {
    this.setState({ endDate });
  };

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

  handleSubmit = e => {
    if (this._mounted) {
      e.preventDefault();
      this.setState({ formIsSubmitting: true }, () => {
        axios.defaults.withCredentials = true;
        let form = new FormData();
        form.append("name", this.state.electionName);
        form.append("start_date", this.state.startDate);
        form.append("end_date", this.state.endDate);
        axios(`${process.env.REACT_APP_API_PATH}/api/dashboard/election`, {
          method: "post",
          data: form
        }).then(res => {
          if (res.data.isSessionValid == "false")
            this.props.history.push("/login");
          else {
            this.setState({
              formIsSubmitting: false
            });
            if (res.data.isValid === false) {
              if (res.data.field === "electionName")
                alert(
                  "The election name you entered is not valid, it must be at least 3 words long"
                );
              else if (res.data.field === "startDate")
                alert("The start date you entered is not valid");
              else if (res.data.field === "endDate")
                alert("The end date you entered is not valid");
              else if (res.data.field === "smallStartDate")
                alert(
                  "The start date of an election must be set to today or a later date"
                );
              else if (res.data.field === "startDateNotTens")
                alert(
                  "The start date of an election must have a time whose minute is a multiple of ten"
                );
              else if (res.data.field === "endDateNotTens")
                alert(
                  "The end date of an election must have a time whose minute is a multiple of ten"
                );
              else if (res.data.field === "smallEndDate")
                alert(
                  "The end date of an election must be at least one hour ahead of the start date of an election"
                );
              else if (res.data.field === "pastEndDate")
                alert("The end date must be set to the future");
              else if (res.data.field === "invalidDates")
                alert("The dates you entered are invalid");
            } else if (res.data.exists === true)
              this.props.history.push("/dashboard/election");
            else if (res.data.completed === true)
              this.props.history.push("/dashboard/election");
          }
        });
      });
    }
  };

  render() {
    return (
      <CreateElectionFormView
        handleStartDateChange={this.handleStartDateChange}
        handleEndDateChange={this.handleEndDateChange}
        onChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        election={this.props.election}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default CreateElectionFormController;
