import React,{Component} from 'react';
import PopupLogin from './PopupLogin';
import PopupRegister from './PopupRegister';

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
  if(this.state.status==0){
    rightStatus=<ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#signup">Sign up</a>
        </li>
    </ul>;
  }
  else {
    rightStatus=<ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#profile">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#logout">Logout</a>
            </li>

        </ul>;
  }

  return(
<div>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark ">
        <a class="navbar-brand" href="/">Enjoyneering</a>
        <button type="button" data-toggle="collapse" data-target="#demo" class="navbar-toggler btn btn-dark border border-secondary btn-sm"><span class="navbar-toggler-icon"></span></button>

        <div class="collapse navbar-collapse" id="demo">
  {/* left menu */}
            <ul class="navbar-nav mr-auto">
  {/* Education dropdown*/}
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="education.php" id="navbardrop" data-toggle="dropdown">Education</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="/quiz">Quiz</a>
                        <a class="dropdown-item" href="/homework">Homework</a>
                        <a class="dropdown-item" href="/library">Library</a>
                    </div>
                </li>
{/* forum */}
                <li class="nav-item"><a class="nav-link" href="foum.php">Forum</a></li>
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
