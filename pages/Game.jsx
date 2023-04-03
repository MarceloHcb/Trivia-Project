import React, { Component } from 'react';
import GamePage from '../components/GamePage';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GamePage { ...this.props } />
      </div>
    );
  }
}

export default Game;
