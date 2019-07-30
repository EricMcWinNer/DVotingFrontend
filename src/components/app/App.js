import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Login from "routes/login";
import Register from "routes/register";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />

      {/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/}
    </Router>
  );
}

export default App;
