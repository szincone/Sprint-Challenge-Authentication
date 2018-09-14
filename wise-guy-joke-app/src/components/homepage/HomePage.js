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
        <div style={{ margin: "1rem 0" }}>
          {this.state.jokes.map(joke => (
            <div
              key={joke.id}
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                margin: ".5rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                {joke.setup}
                <span>...</span>
              </div>

              <div>{joke.punchline}</div>
            </div>
          ))}
        </div>
        <button
          style={{ background: "navy", color: "white" }}
          onClick={this.signoutHandler}
        >
          Sign Out
        </button>
      </Fragment>
    );
  }
}

export default withRouter(HomePage);
