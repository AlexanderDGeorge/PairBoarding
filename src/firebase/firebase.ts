import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCbdNrcuBGDVF8-iL9UxCgsCFCbTGhoJS8",
    authDomain: "pairboarddev.firebaseapp.com",
    databaseURL: "https://pairboarddev.firebaseio.com",
    projectId: "pairboarddev",
    storageBucket: "pairboarddev.appspot.com",
    messagingSenderId: "384687900425",
    appId: "1:384687900425:web:7d09aa9aab471725f975d8",
    measurementId: "G-D1V3YVRD2Q",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const firestore = firebase.firestore;
export const database = firebase.database;
export const fieldValue = firebase.firestore.FieldValue;
export const githubProvider = new firebase.auth.GithubAuthProvider();
