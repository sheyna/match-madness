import React, { Component } from 'react';
import firebase from 'firebase';
import './GameBoard.css';
import cards from '../cards.json';
import GameCard from '../GameCard/GameCard.js'

const auth = firebase.auth();
const database = firebase.database().ref("/");

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setOfFour: [],
            cards: {},
            totalPoints: 0
        };
    }

    getCount = () => {
        return this.state.setOfFour.length;
    }

    addToFlippedCount = (cardData) => {
        let num = this.getCount(); // gets length of this.state.setOfFour
        if (num < 4) {
            this.setState((prevState, props) => {
                const updatedSetOfFour = prevState.setOfFour;
                updatedSetOfFour.push(cardData);
                return {
                    setOfFour: updatedSetOfFour
                }; // this.callback is running even though the setState here hasn't finished updating to add the 4th item to setOfFour
            }, this.callback(num));
        }
    };

    callback = (num) => {
        // // The below still comes back as 3, even when it should be 4:
        // let len = this.getCount();
        // if (len === 4) {

        if (num + 1 === 4) {  // this hack forces the setTimout to fire (it doesn't fire without it):
            setTimeout(this.scoreCards(), 100000); // hack to give State longer to update, it doesn't work
        }
    }

    scoreCards = () => {
        let points = 0;
        const compare = this.state.setOfFour; // I'm only getting the first 3 cards in this, when there should be 4.

        let groups = [];
        for (let v = 0; v < compare.length; v++) {
            groups.push(compare[v].group);
        }
        console.log(groups); // Only outputs 3 items

        const groupNames = ["Cinder", "Kai", "Scarlet", "Wolf", "Cress", "Thorne", "Winter", "Jacin", "Iko", "Lavana"];
        for (let i = 0; i < groupNames.length; i++) {
            let needle = groupNames[i];
            let scorePoints = this.findIt(groups, needle);
            console.log(groupNames[i] + ": " + scorePoints);
            points = points + scorePoints;
        }

        // let subGroups = []
        // for (let v = 0; v < compare.length; v++) {
        //     subGroups.push(compare[v].subGroup);
        // }
        // const subGroupNames = ["Power", "Tool", "Weakness", "Trait"];
        // for (let i = 0; i < subGroupNames.length; i++) {
        //     points += this.findIt(groups, subGroups[i]);
        // }

        console.log(points);
        this.setState((prevState, props) => {
            const oldTotalPoints = prevState.totalPoints;
            const newTotalPoints = oldTotalPoints + points;
            return {
                totalPoints: newTotalPoints
            };
        });
    }

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
    }

    nthIndexOf = (arrr, e, n) => {
        for (let i = 0, len = arrr.length; i < len; i++) {
            if (i in arrr && e === arrr[i] && !--n) {
                return true;
            }
        }
        return false;
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.setOfFour !== nextState.setOfFour) {
          return false;
        } else {
            return false;
        }
    }

    componentDidMount() {
        if (!auth.currentUser) {
            alert("You must be logged in");
            // redirect:
            return this.props.history.push('/');
        }
        // af.database.list('/', { preserveSnapshot: true})
        //     .subscribe(snapshots=>{
        //         snapshots.forEach(snapshot => {
        //             console.log(snapshot.key, snapshot.val());
        //             this.items.push({
        //                 id: snapshot.key,
        //                 name: snapshot.val().name
        //             });
        //         });
        //     });
        database.on('value', (snapshot) => {
            //     console.log(snapshot.val());
            //     this.setState(() => {
            //         return {cards: snapshot.val() || []};
            //     });
            // })
            console.log(snapshot.val());
            this.setState({cards: snapshot.val()});
        })
    }

    shuffle = (arr) => {
        let radix = 10;
        for(let j, x, i = arr.length; i; j = parseInt(Math.random() * i, radix), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };

    render() {
        const cardsShuf = this.shuffle(cards);
        return (
            <section className="game-board">
                {cardsShuf.map((cardsShuf, idx) => {
                    return <GameCard key={idx} card={cardsShuf} addToFlippedCount={this.addToFlippedCount.bind(this)} getCount={this.getCount} />;
                })}
            </section>
        );
    }
}

export default GameBoard;
