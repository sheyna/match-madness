import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <section className="home-page">
              <div>
                <Link to="/game">Play Game</Link>
              </div>
            </section>
        );
    }
}

export default HomePage;
