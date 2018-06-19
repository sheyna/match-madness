import React, { Component } from 'react';
import './GameCard.css';
import {
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';

class GameCard extends Component {

  render() {
    // const people = this.props.people;
    // const url = people.url;
    // const indexNumber = url.split('/').reverse()[1];
    // const backgroundMediaStyles = {
    //     backgroundImage: 'url(\'/characters/character-' + indexNumber + '.jpg\')',
    // };
    return (
      <section className="game-card">
        <h1>{this.props.card.name}</h1>
      </section>

    )
  }
}

export default GameCard;
