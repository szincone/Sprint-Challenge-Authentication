import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class HomePage extends Component {
  state = {
    jokes: [],
    togglePunchline: false,
    hiddenVar: "none",
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
  togglePunchline = () => {
    if (this.state.hiddenVar === "flex") {
      this.setState({ hiddenVar: "none" });
    } else {
      this.setState({ hiddenVar: "flex" });
    }
    if (!this.state.togglePunchline) {
      this.setState({
        togglePunchline: !this.state.togglePunchline,
      });
    } else {
      this.setState({
        togglePunchline: this.state.togglePunchline,
      });
    }
  };
  render() {
    console.log("WORKING", this.state.hiddenVar);
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
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  background: "white",
                  color: "navy",
                }}
                onClick={this.togglePunchline}
              >
                {joke.setup}
                <span>...</span>
              </div>

              <div
                style={{
                  display: this.state.hiddenVar,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                {joke.punchline}
              </div>
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
