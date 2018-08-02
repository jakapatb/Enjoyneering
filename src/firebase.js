// Initialize Firebase
import * as firebase from 'firebase';
export const DB_config = {
  apiKey: "AIzaSyBc-xdIMIJ08LiTrUhzZ2WTk3a1uoLZhG8",
    authDomain: "enjoyneering-fb975.firebaseapp.com",
    databaseURL: "https://enjoyneering-fb975.firebaseio.com",
    projectId: "enjoyneering-fb975",
    storageBucket: "enjoyneering-fb975.appspot.com",
    messagingSenderId: "246359451764"
};

firebase.initializeApp(DB_config);

const database = firebase.database();

const getMessage=(element)=>{
  const Ref = database.ref().child(element);
  Ref.on('value', snap => {
    console.log(snap.val());
    var obj = {test:'555',Tag: snap.val()};
    console.log(obj);
  return obj;
  });
}
export {
  database,getMessage
};
