import React, {Component} from 'react';
import './profile.css';
import {Link} from 'react-router-dom';
class Profile extends Component {
  constructor(){
    super();
    this.state={
      id:59010187,
      name:'Mr.Jakkapat Boonroj',
      degree:'Bachelor of Engineering',
      date:'19/01/1997',
      major:'Infomation Engineering',
      email:'max.jakkapat@gmail.com'
    };
  }
  render() {
    return (<div class="container">
      <br/>

        {/* rightinfo Image Profile */}
          <img src="img/59010187.jpg" alt="profile" class="rounded img-profile float-left"/>
        {/* left info Profile */}
        <div class="bg-light blog-profile">
          <h1>Your Profile</h1>
          <div class="row">
            {/* left info */}
            <div class="col blog-info">
              <h3>Name</h3>
              <p>{this.state.name}</p>
              <h3>Degree</h3>
              <p>{this.state.degree}</p>
              <h3>Date of Birth</h3>
              <p>{this.state.date}</p>
            </div>
            {/* right info */}
            <div class="col col-md-6 blog-info">
              <h3>Student ID</h3>
              <p>{this.state.id}</p>
              <h3>Major</h3>
              <p>{this.state.major}</p>
              <h3>Email</h3>
              <p>{this.state.email}</p>
            </div>
          </div>
        </div>
<Link class="btn btn-block btn-primary " to="/edit-profile">Edit Profile</Link>

{/* Real Time Schedule */}
      <div class=" bg-dark col-md-12">
<h2 class="text-white">Your Schedule</h2>

<div class="row">
<div class="col col-md-2 bg-primary">
<div class=""><h4>Sun</h4></div>
<div class=""><h4>Mon</h4></div>
<div class=""><h4>Tue</h4></div>
<div class=""><h4>Wed</h4></div>
<div class=""><h4>Thu</h4></div>
<div class=""><h4>Fri</h4></div>
<div class=""><h4>Sat</h4></div>
</div>

</div>
      </div>
    </div>);
  }

}

export default Profile;
