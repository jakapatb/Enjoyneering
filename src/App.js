import React,{Component} from 'react';
import Main from './Main';
import Header from './component/Header';
import firebase from 'firebase';
import {DB_config} from './Config';
class App extends Component{
  constructor(props){
    super(props);
    firebase.initializeApp(DB_config);
  }
render(){
  var firebaseRef = firebase.database().ref("Post");
  firebaseRef.once('value').then(function(dataSnapshot){
    console.log(dataSnapshot.val());
  });
  return(
    <div>
    <Header/>
    <Main/>
  </div>
  );
}
}

export default App;
