import React, { Component } from 'react';
import firebase from 'firebase';
import './GameBoard.css';
import cards from '../cards.json';
import GameCard from '../GameCard/GameCard.js'

const auth = firebase.auth();
const database = firebase.database();

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            journalEntries: {},
            entryInput: ''
        }
    }

    componentDidMount() {
        if (!auth.currentUser) {
            alert("You must be logged in");
            // redirect:
            return this.props.history.push('/');
        }
        database.ref(`/users/${auth.currentUser.uid}`)
            .on('value', (snapshot) => {
                console.log(snapshot.val());
                this.setState(() => {
                    return {journalEntries: snapshot.val() || {}};
                });
            })
    }

    onInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        this.setState(() => {
            return {
                entryInput: newValue
            };
        })
    }

    addEntry = (e) => {
        e.preventDefault();
        database.ref(`/users/${auth.currentUser.uid}`)
            .push(this.state.entryInput);
        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }

    render() {
        return (
            <section className="game-board">
                {cards.map((cards, idx) => {
            return <GameCard key={idx} card={cards} />;
          })}
            </section>
        );
    }
}

export default GameBoard;
