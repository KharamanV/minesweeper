import React, { Component } from 'react';
import axios from 'axios';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minesCount: null,
      size: null,
    };
  }

  componentWillMount() {
    // 5979ea24c2723f6a56023867
  }

  render() {
    return (
      <div className="app">
        Hello from React!

        <Board {...this.state} />
      </div>
    );
  }
}

export default App;