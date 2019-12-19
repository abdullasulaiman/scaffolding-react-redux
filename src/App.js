import React, { Component } from "react";
import "./App.css";
import store from './store';

class App extends Component {

  render() {
    console.log(store);
    return (
      <div>Scaffolding Project with React, Redux and Typescript</div>
    );
  }
}

export default App;
