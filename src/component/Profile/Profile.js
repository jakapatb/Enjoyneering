import React, {Component} from 'react';
import LittleDay from './LittleDay';
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

    return (

      <div class="container-fuild">
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

<table class="table table-striped">
    <thead>
        <tr >
            <th class="text-center border">Day</th>
            <th class="text-center border">08.00-09.00</th>
            <th class="text-center border">09.00-10.00</th>
            <th class="text-center border">10.00-11.00</th>
            <th class="text-center border">11.00-12.00</th>
            <th class="text-center border">12.00-13.00</th>
            <th class="text-center border">13.00-14.00</th>
            <th class="text-center border">14.00-15.00</th>
            <th class="text-center border">15.00-16.00</th>
            <th class="text-center border">16.00-17.00</th>
            <th class="text-center border">17.00-18.00</th>
            <th class="text-center border">18.00-19.00</th>
        </tr>
    </thead>
    <tbody>
      <LittleDay day="MON"/>
      <LittleDay day="TUE"/>
      <LittleDay day="WED"/>
      <LittleDay day="THU"/>
      <LittleDay day="FRI"/>
      <LittleDay day="SAT"/>
      <LittleDay day="SUN"/>
    </tbody>
    </table>
      </div>
    </div>);
  }

}

export default Profile;
