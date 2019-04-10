// Initialize Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// Required for side-effects
//require("firebase/firestore");
export const config = {
    apiKey: "AIzaSyCaqCsynNjtmhytqPfVdrM1BI9UpefvBwA",
    authDomain: "enjoyneering-1531218835783.firebaseapp.com",
    databaseURL: "https://enjoyneering-1531218835783.firebaseio.com",
    projectId: "enjoyneering-1531218835783",
    storageBucket: "enjoyneering-1531218835783.appspot.com",
    messagingSenderId: "752358894366"
};

firebase.initializeApp(config);

export default firebase;
