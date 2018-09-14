import React, { Component } from "react";
import axios from "axios";

export class Signup extends Component {
  state = {
    username: "",
    password: "",
  };
  handleSignupChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  signinHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:7500/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => console.log("AXIOS ERR", err));
  };
  render() {
    return (
      <form onSubmit={this.signinHandler}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleSignupChange}
            style={{ width: "8rem" }}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleSignupChange}
            style={{ width: "8rem" }}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
}
