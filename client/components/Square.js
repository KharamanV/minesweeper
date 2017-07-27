import React, { Component } from 'react';
import axios from 'axios';

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleClick = () => {
    if (this.state.value) {
      return;
    }

    const { x, y } = this.props;

    axios.post(`/api/games/5979ea24c2723f6a56023867/reveal?x=${x}&y=${y}`)
      .then(({ data }) => {
        if (data.status === 'success') {
          this.setState({ value: data.minesCount });
        }

        if (data.status === 'failure') {
          this.setState({ value: '💣' });
        }
      });
  };

  render() {
    return (
      <button
        className="square"
        style={{
          outline: 'none',
          border: 'none',
          backgroundColor: '#999',
          width: '30px',
          height: '30px',
          marginLeft: '5px',
          marginTop: '5px',
          cursor: 'pointer',
          verticalAlign: 'top',
        }}
        onClick={this.handleClick}
      >
        {this.state.value}
      </button>
    );
  }
};

export default Square;