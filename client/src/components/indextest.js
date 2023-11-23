import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3030/")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res["response"] }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="Index">
        <p className="Index-Res">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default Index;
