import React, { Component } from 'react';
import './GameCard.css';
import PropTypes from 'prop-types';

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
    let pointerEvents;
    if (this.props.isFlipped === true) {
      zIndexStatus = 0;
      cursorStatus = "default";
      pointerEvents = "none";
    } else {
      zIndexStatus = -2;
      cursorStatus = "pointer";
      pointerEvents = "auto";
    }

    // set inline styles:
    let valueStyles = {
        backgroundColor: cardInstance.color,
        zIndex: zIndexStatus
    };
    let gameCardStyles = {
        cursor: cursorStatus,
        pointerEvents: pointerEvents
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

GameCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    group: PropTypes.string.isRequired,
    subGroup: PropTypes.string,
    color: PropTypes.string
  }),
  isFlipped: PropTypes.bool,
  addToFlippedCount: PropTypes.func,
  getCount: PropTypes.func,
  updateFlipped: PropTypes.func
};

export default GameCard;
