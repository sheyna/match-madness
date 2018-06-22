import React, { Component } from 'react';
import './GameCard.css';
// import {
//   Link
// } from "react-router-dom";
// import PropTypes from 'prop-types';

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: -2,
      value: {}
    }
  }

  addToCount = (cardInst) => {
    this.props.addToFlippedCount(cardInst);
  }

  flipCard = (e, cardInstance) => {
    let count = this.props.getCount();
    if (count < 4) {
      this.setState({flipped: 0});
      count = count + 1;
      this.addToCount(cardInstance, count);
    }
  }

  render() {
    const cardInstance = this.props.card;
    //this.setState({value: cardInstance});
    const cardBackground = {
        backgroundColor: cardInstance.color,
        zIndex: this.state.flipped,
    };

    return (
      <section className="game-card" id={cardInstance.id} onClick={((e) => this.flipCard(e, cardInstance))}>
        <div className="value" style={cardBackground}>
          <h2><span>{cardInstance.name}</span></h2>
          <h1>{cardInstance.group}</h1>
          <p>Class: {cardInstance.subGroup}</p>
        </div>
      </section>

    )
  }
}

export default GameCard;
