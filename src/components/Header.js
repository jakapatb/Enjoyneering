import React,{Component} from 'react';
import PopupLogin from './PopupLogin';
import PopupRegister from './PopupRegister';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import {database} from '../firebase';

class Header extends Component{
  logOut=() => {
    firebase.auth().signOut();
  }
  constructor(props){
    super(props);
    this.getMessage= this.getMessage.bind(this);
    this.state={
      user:{},
      uid:[{
        email:'',
        username:''
      }]
      /*status:1*/
    };
  }
  componentDidMount(){
    this.authListener();
  }

  getMessage(element) {

    const Ref = database.ref(element);
    Ref.on('value', snap => {
      this.setState({uid:snap.val()})
       this.props.get(snap.val());
    });

  }

authListener(){
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      this.getMessage('Users/'+user.uid);
    this.setState({user: 0 });
  }else{
    this.setState({user: 1 });
  }
});
}
  render(){
    var rightStatus;
  if(this.state.user == 1 ){
    rightStatus=<ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <Link class="nav-link" data-toggle="modal" data-target="#login" to="#login">Login</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" data-toggle="modal" data-target="#signup" to="#signup">Sign up</Link>
        </li>
    </ul>;
  }
  else {
    rightStatus=<ul class="navbar-nav ml-auto">
      <li class="nav-item"><h5 class=" navbar-brand">{this.state.uid.username}</h5></li>
            <li class="nav-item">
                <Link class="nav-link" to="/profile">Profile</Link>
            </li>
            <li class="nav-item">
                <button class=" btn btn-primary" onClick={this.logOut}>Logout</button>
            </li>

        </ul>;
  }

  return(
<div>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark ">
        <Link class="navbar-brand" to="/">Enjoyneering</Link>
        <button type="button" data-toggle="collapse" data-target="#demo" class="navbar-toggler btn btn-dark border border-secondary btn-sm"><span class="navbar-toggler-icon"></span></button>

        <div class="collapse navbar-collapse" id="demo">
  {/* left menu */}
            <ul class="navbar-nav mr-auto">
  {/* Education dropdown*/}
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="education.php" id="navbardrop" data-toggle="dropdown">Education</Link>
                    <div class="dropdown-menu">
                        <Link class="dropdown-item" to="/search">Posts</Link>
                        <Link class="dropdown-item" to="/course">Course</Link>
                        <Link class="dropdown-item" to="/quiz">Quiz</Link>
                        <Link class="dropdown-item" to="/homework">Homework</Link>
                        <Link class="dropdown-item" to="/library">Library</Link>
                    </div>
                </li>
{/* forum */}
                <li class="nav-item"><Link class="nav-link" to="/forum">Forum</Link></li>
            </ul>
    {/* right menu */}
{rightStatus}

        </div>
    </nav>
    <PopupLogin/>
    <PopupRegister/>
    </div>
  );
}
}

export default Header;
