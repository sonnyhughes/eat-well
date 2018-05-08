//this is our entry file, where the app begins
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbp7fr3iGNntT3q6iy-FTPQ8cUroTeB5M",
    authDomain: "eat-well-app.firebaseapp.com",
    databaseURL: "https://eat-well-app.firebaseio.com",
    storageBucket: "eat-well-app.appspot.com",
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
