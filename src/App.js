import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      inputText: "",
      todos: [
        // {
        //   id: 1,
        //   title: "Teach Cypress Testing Suite",
        //   isComplete: false
        // }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/todos", { title: this.state.inputText, isComplete: false })
      .then(({ data }) => {
        this.setState({
          todos: data,
          inputText: ""
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <span
          style={{
            display: this.state.error ? "block" : "none",
            backgroundColor: "red",
            height: "50px",
            width: "200px",
            margin: "auto"
          }}
        >
          Oh No!
        </span>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            value={this.state.inputText}
            autoFocus
            className="new_todo"
            placeholder="Add new Todo"
          />
        </form>
        <List todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
