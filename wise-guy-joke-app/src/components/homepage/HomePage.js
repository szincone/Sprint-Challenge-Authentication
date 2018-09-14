import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class HomePage extends Component {
  state = {
    jokes: [],
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:7500/api/jokes", reqOptions)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => console.log("AXIOS GET JOKES ERR", err));
  }
  signoutHandler = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };
  render() {
    return (
      <Fragment>
        <ul style={{ margin: "1rem 0" }}>
          {this.state.jokes.map(joke => (
            <li
              key={joke.id}
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                margin: ".5rem 0",
              }}
            >
              {joke.setup}
              ...
              {joke.punchline}
            </li>
          ))}
        </ul>
        <button onClick={this.signoutHandler}>Sign Out</button>
      </Fragment>
    );
  }
}

export default withRouter(HomePage);
