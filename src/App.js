import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import GameBoard from './GameBoard/GameBoard';
import NavigationBar from './NavigationBar/NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavigationBar />
            <Route exact path="/" component={HomePage} />
            <Route path="/game" component={GameBoard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
