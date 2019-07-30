import React, { Component } from "react";
import LoginView from "./LoginView";

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formIsSubmitting: false
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  handleChange = e => {
    let { name, value, type } = e.target;
    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formIsSubmitting: true }, () => {
      setTimeout(() => this.setState({ formIsSubmitting: false }), 3500);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <LoginView
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default LoginController;
