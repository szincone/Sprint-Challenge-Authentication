import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Signup } from "./components/signup/Signup.js";
import { Signin } from "./components/signin/Signin.js";
import HomePage from "./components/homepage/HomePage.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/jokes" component={HomePage} />
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;
