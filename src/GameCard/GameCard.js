import React, { Component } from 'react';
import './GameCard.css';
// import PropTypes from 'prop-types';

class GameCard extends Component {

  // If less than 4 in setOfFour, flip card, record in setOfFour state:
  flipCard = (e, cardInstance) => {
    let count = this.props.getCount();
    if (count < 4) {
      this.props.updateFlipped(cardInstance.id, true);
      count = count + 1;
      this.props.addToFlippedCount(cardInstance);
    }
  }

  render() {
    const cardInstance = this.props.card;
    const idCard = this.props.id;
    let valueId = "value-" + idCard;

    // set style variables:
    let zIndexStatus;
    let cursorStatus;
    if (this.props.isFlipped === true) {
      zIndexStatus = 0;
      cursorStatus = "default";
    } else {
      zIndexStatus = -2;
      cursorStatus = "pointer";
    }

    // set inline styles:
    let valueStyles = {
        backgroundColor: cardInstance.color,
        zIndex: zIndexStatus
    };
    let gameCardStyles = {
        cursor: cursorStatus
    };

    return (
      <section className="game-card" id={cardInstance.id} style={gameCardStyles} onClick={((e) => this.flipCard(e, cardInstance))}>
        <div className="value" id={valueId} style={valueStyles}>
          <h2><span>{cardInstance.name}</span></h2>
          <h1>{cardInstance.group}</h1>
          <p>Class: {cardInstance.subGroup}</p>
        </div>
      </section>
    )
  }
}

export default GameCard;
