import React, { Component } from 'react';
import firebase from 'firebase';
import './GameBoard.css';
import cards from '../cards.json';
import GameCard from '../GameCard/GameCard.js'

const auth = firebase.auth();
const database = firebase.database().ref("/");

function shuffle(arr) {
    let radix = 10;
    for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i, radix), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
};

const cardsShuf = shuffle(cards);

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setOfFour: [],
            cards: {},
            totalPoints: 0,
            id0101 : false,
            id0102 : false,
            id0103 : false,
            id0104 : false,
            id0201 : false,
            id0202 : false,
            id0203 : false,
            id0204 : false,
            id0301 : false,
            id0302 : false,
            id0303 : false,
            id0304 : false,
            id0401 : false,
            id0402 : false,
            id0403 : false,
            id0404 : false,
            id0501 : false,
            id0502 : false,
            id0503 : false,
            id0504 : false,
            id0601 : false,
            id0602 : false,
            id0603 : false,
            id0604 : false,
            id0701 : false,
            id0702 : false,
            id0703 : false,
            id0704 : false,
            id0801 : false,
            id0802 : false,
            id0803 : false,
            id0804 : false,
            id0901 : false,
            id0902 : false,
            id0903 : false,
            id0904 : false,
            id1001 : false,
            id1002 : false,
            id1003 : false,
            id1004 : false
        };
    };

    // set flipped status in state of individual cards, from card's id:
    updateFlipped = (id, flippedIt) => {
        var stateObject = function() {
            let returnObj = {};
            returnObj[id] = flippedIt;
            return returnObj;
        };
        this.setState( stateObject );
    };

    // get how many cards are in setOfFour state:
    getCount = () => {
        return this.state.setOfFour.length;
    };

    // Add flipped card data to setOfFour in state:
    addToFlippedCount = (cardData) => {
        let num = this.getCount();
        if (num < 4) {
            this.setState((prevState, props) => {
                let updatedSetOfFour = prevState.setOfFour;
                updatedSetOfFour.push(cardData);
                return {
                    setOfFour: updatedSetOfFour
                };
            }, this.checkIfTimeToScore(num));
        }
    };

    // confirm 4 cards have been selected:
    checkIfTimeToScore = (num) => {
        if (num + 1 === 4) {
            setTimeout(function() { this.scoreCards(); }.bind(this), 1000);
        }
    };

    scoreCards = () => {
        let points = 0;
        const compare = this.state.setOfFour;

        let groups = [];
        for (let v = 0; v < compare.length; v++) {
            groups.push(compare[v].group);
        }

        let ids = [];
        for (let g = 0; g < compare.length; g++) {
            ids.push(compare[g].id);
        }

        let idsOfMatches = [];
        let dudIds = [];

        // find matches and remove them from board:
        const groupNames = ["Cinder", "Kai", "Scarlet", "Wolf", "Cress", "Thorne", "Winter", "Jacin", "Iko", "Lavana"];
        for (let i = 0; i < groupNames.length; i++) {
            let needle = groupNames[i];
            let scorePoints = this.findIt(groups, needle);
            points = points + scorePoints;

            if (scorePoints > 1) {
                let times;
                if (scorePoints === 10) {
                    times = 4;
                } else if (scorePoints === 6) {
                    times = 3;
                } else if (scorePoints === 2) {
                    times = 2;
                }
                // collect ids of matched cards in an array:
                for (let k = 1; k <= times; k++) {
                    let m = this.returnNthIndexOf(groups, groupNames[i], k);
                    idsOfMatches.push(ids[m]);
                }
                // remove matches from board:
                for (let z = 0; z < idsOfMatches.length; z++) {
                    this.removeReplaceCard(idsOfMatches[z]);
                }
            }
        }

        // update user total score in state:
        this.setState((prevState, props) => {
            const oldTotalPoints = prevState.totalPoints;
            const newTotalPoints = oldTotalPoints + points;
            return {
                totalPoints: newTotalPoints,
                setOfFour: []
            };
        });

        // get cards that didn't have matches and flip them over (face down):
        for (let b = 0; b < ids.length; b++) {
            if (this.nthIndexOf(idsOfMatches, ids[b], 1) === false) {
                dudIds.push(ids[b]);
            }
        }
         setTimeout(function() { this.restoreFlippedDuds(dudIds); }.bind(this), 1000);
    };

    // flip down a non-matching card:
    restoreFlippedDuds = (dudIds) => {
        for (let a = 0; a < dudIds.length; a++) {
            this.updateFlipped(dudIds[a], false);
        }
    };

    // take a name see if multiple up turned cards match it:
    findIt = (haystackArray, needle) => {
        if (this.nthIndexOf(haystackArray, needle, 4)) {
            return 10;
        } else if (this.nthIndexOf(haystackArray, needle, 3)) {
            return 6;
        } else if (this.nthIndexOf(haystackArray, needle, 2)) {
            return 2;
        } else {
            return 0;
        }
    };

    // These two functions do practically the same thing.
    // They find out if a value is in an array multiple times
    // The n is the "nth" occurrence

    // 1.) This returns a boolen value
    nthIndexOf = (arrr, e, n) => {
        const index = this.returnNthIndexOf(arrr, e, n);
        if (index !== -1) {
            return true;
        } else {
            return false;
        }
    };

    // 2.) This returns the index of the nth match
    returnNthIndexOf = (arrr, e, n) => {
        let index = -1;
        for (let i = 0, len = arrr.length; i < len; i++) {
            if (i in arrr && e === arrr[i] && !--n) {
                index = i;
                break;
            }
        }
        return index;
    };

    // remove (or rather hide) cards that have been matched:
    removeReplaceCard = (idToRemove) => {
        // update this to use state:
        document.getElementById(idToRemove).classList.add('blank');
        document.getElementById(idToRemove).classList.remove('game-card');
    };

    componentDidMount() {
        if (!auth.currentUser) {
            alert("You must be logged in");
            // redirect:
            return this.props.history.push('/');
        }
        // This does not work yet. Appears to be problem with retrieving array-like data from firebase.
        database.on('value', (snapshot) => {
            // const object1 = snapshot.val();
            // let arrayFilter = [];
            // for (let property1 in object1) {
            //     arrayFilter.push(object1[property1]);
            // }
            console.log(snapshot.val());
            this.setState(() => {
                return {cards: snapshot.val() || []};
                // return {cards: arrayFilter || [] };
            });
        })
    };


    render() {
        return (
            <main>
                <div className="score">Score: <span>{this.state.totalPoints}</span></div>
                <p className="instructions"><span>Select 4 cards,</span> if all 4 match you get 10 points. If you get 3 matches you get 6 points. 2 matches gives you 2 points. See how high you can score.</p>
                <section className="game-board">
                    {cardsShuf.map((cardsShuf, idx) => {
                        let cardId = cardsShuf.id;
                        return <GameCard key={idx} card={cardsShuf} isFlipped={this.state[cardId]} addToFlippedCount={this.addToFlippedCount.bind(this)} getCount={this.getCount} updateFlipped={this.updateFlipped}/>;
                    })}
                </section>
            </main>
        );
    };
};

export default GameBoard;
