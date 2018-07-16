import React,{Component} from 'react';
import PopupLogin from './PopupLogin';
import PopupRegister from './PopupRegister';
import {Link} from 'react-router-dom';
class Header extends Component{
  constructor(){
    super();
    this.state={
      /* Status Login/Logout
        0 ยังไม่ล๊อกอืน
        1 ล๊อกอินแล้ว
        */
      status:0
    };
  }
render(){
  var rightStatus;
  if(this.state.status===0){
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
            <li class="nav-item">
                <Link class="nav-link" to="/profile">Profile</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/action_logout">Logout</Link>
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
                        <Link class="dropdown-item" to="/tag">Posts</Link>
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
