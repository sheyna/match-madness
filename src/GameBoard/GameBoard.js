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

    addToFlippedCount = (cardData) => {
        let num = this.getCount();
        if (num < 4) {
            this.setState((prevState, props) => {
                const updatedSetOfFour = prevState.setOfFour;
                updatedSetOfFour.push(cardData);
                return {
                    setOfFour: updatedSetOfFour
                };
            }, this.callback(num));
        }
    };

    callback = (num) => {
        if (num + 1 === 4) {
            setTimeout(this.scoreCards(), 100000);
        }
    }

    scoreCards = () => {
        let points = 0;
        const compare = this.state.setOfFour;
        let groups = [];
        for (let v = 0; v < compare.length; v++) {
            groups.push(compare[v].group);
        }
        // let subGroups = []
        // for (let v = 0; v < compare.length; v++) {
        //     subGroups.push(compare[v].subGroup);
        // }
        const groupNames = ["Cinder", "Kai", "Scarlet", "Wolf", "Cress", "Thorne", "Winter", "Jacin", "Iko", "Lavana"];
        // const subGroupNames = ["Power", "Tool", "Weakness", "Trait"];

        const test = ["Cress", "Cinder", "Cress", "Thorne"];
        console.log(this.findIt(test, groupNames[4]));

        console.log(groups);
        for (let i = 0; i < groupNames.length; i++) {
            let needle = groupNames[i];
            let scorePoints = this.findIt(groups, needle);
            console.log(groupNames[i] + ": " + scorePoints);
            points = points + scorePoints;
        }
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

    getCount = () => {
        return this.state.setOfFour.length;
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

    // onInputChange = (e) => {
    //     e.preventDefault();
    //     const newValue = e.target.value;
    //     this.setState(() => {
    //         return {
    //             entryInput: newValue
    //         };
    //     })
    // }

    // addEntry = (e) => {
    //     e.preventDefault();
    //     database.ref(`/users/${auth.currentUser.uid}`)
    //         .push(this.state.entryInput);
    //     this.setState(() => {
    //         return {
    //             entryInput: ''
    //         };
    //     })
    // }

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
