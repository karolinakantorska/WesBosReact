import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDV7FJdFvwbIDvECyK9hxbt4wXW-5DZCr8",
  authDomain: "fishshop-react.firebaseapp.com",
  databaseURL: "https://fishshop-react.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;