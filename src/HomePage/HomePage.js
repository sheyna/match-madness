import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Match Madness</h1>
                <Link to="/game">Play Game</Link>
            </div>
        );
    }
}

export default HomePage;
