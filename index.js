// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('starSRVP');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
const firebaseConfig = {
    apiKey: "AIzaSyD5E1gd4BcYMRPl-jY0kMraVuaD0Zu_9P0",
    authDomain: "fir-web-codelab-5f6a4.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-5f6a4.firebaseio.com",
    projectId: "fir-web-codelab-5f6a4",
    storageBucket: "fir-web-codelab-5f6a4.appspot.com",
    messagingSenderId: "520055069392",
    appId: "1:520055069392:web:eb82c6429c58aaa2b75cd5"
  };

 firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

 const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click", ()=> {
if (firebase.auth().currentUser) {
firebase.auth().signOut();
} else {
ui.start("#firebaseui-auth-container", uiConfig);
}
});

firebase.auth().onAuthStateChanged((user)=> {
if (user) {
startRsvpButton.textContent = "LOGOUT";
} else {
startRsvpButton.textContent = "RSVP";
}
});

form.addEventListener("sumit",(e)=>{
  e.preventDefault();

  firebase.firestore().collection("guestbook").add({
   text: input.value,
   timestamp: Date.now(),
   name: firebase.auth().currentUser.displayName,
   userId: firebase.auth().currentUser.uid
 })

 input.value = ""; 
 
 return false;
});