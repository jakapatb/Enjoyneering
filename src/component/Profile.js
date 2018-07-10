import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Profile extends Component {
  render() {
    return (<div class="container">
      <br/>
      <div class="row">
        {/* rightinfo Image Profile */}
        <div class="col col-md-4">

          <img src="img/59010187.jpg" alt="profile" class="rounded img-fluid"/>
          <br/>

        </div>
        {/* left info Profile */}
        <div class="col bg-light">
          <h1>Your Profile</h1>
          <div class="row">
            {/* left info */}
            <div class="col col-md-6 ">
              <h3>Name</h3>
              <p>Mr.Jakkapat Boonroj</p>
              <h3>Degree</h3>
              <p>Bachelor of Engineering</p>
              <h3>Date of Birth</h3>
              <p>19/01/1997</p>
            </div>
            {/* right info */}
            <div class="col col-md-6 ">
              <h3>Student ID</h3>
              <p>59010187</p>
              <h3>Major</h3>
              <p>Infomation Engineering</p>
              <h3>Email</h3>
              <p>max.jakkapat@gmail.com</p>

            </div>
          </div>
          <Link class="btn btn-block btn-primary " to="/edit-profile">Edit Profile</Link>
        </div>
      </div>


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
