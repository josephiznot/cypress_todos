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
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/todos")
      .then(({ data }) => {
        this.setState({
          todos: data
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }

  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  handleTodoSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/todos", { title: this.state.inputText, isComplete: true })
      .then(({ data }) => {
        this.setState({ todos: data, inputText: "" });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        {this.state.error && (
          <span className="error">Oh No! Something Broke!</span>
        )}
        <form onSubmit={this.handleTodoSubmit}>
          <input
            onChange={this.handleInputChange}
            autoFocus
            value={this.state.inputText}
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
