import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import './NavigationBar.css';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState(() => {
                return { isLoggedIn: user ? true : false };
            });
        });
    }

    signIn = () => {
        auth.signInWithPopup(provider);
    }

    signOut = () => {
        auth.signOut();
    }

    render() {
        return (
            <header className="navigation-bar">
                <Link to="/"><h1>Match Madness</h1></Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/game">Game</Link></li>
                    {!this.state.isLoggedIn && <li><a href="#signin" onClick={this.signIn}>Sign In</a></li>}
                    {this.state.isLoggedIn && <li><a href="#signout" onClick={this.signOut}>Sign Out</a></li>}
                </ul>
            </header>
        );
    }
}

export default NavigationBar;
