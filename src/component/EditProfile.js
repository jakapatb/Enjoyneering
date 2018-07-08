import React,{Component} from 'react';

class EditProfile extends Component{
render(){

  return(
    <div class="container">
<h1>Edit Profile</h1>
<div class="col bg-light">
  <h1>Your Profile</h1>
  <div class="row">
    {/* left info */}
    <div class="col col-md-6 ">

      <div class="form-group">
          <label for="usr"><h3>Name</h3></label>
          <input type="text" class="form-control" id="usr"/>
      </div>

      <div class="form-group">
          <label for="usr"><h3>Degree</h3></label>
          <input type="text" class="form-control" id="usr"/>
      </div>

      <div class="form-group">
          <label for="usr"><h3>Date of Birth</h3></label>
          <input type="date" class="form-control" id="usr"/>
      </div>
    </div>
    {/* right info */}
    <div class="col col-md-6 ">

      <div class="form-group">
          <label for="usr"><h3>Student ID</h3></label>
          <input type="text" class="form-control" id="usr"/>
      </div>

      <div class="form-group">
          <label for="usr"><h3>Major</h3></label>
          <input type="text" class="form-control" id="usr"/>
      </div>

      <div class="form-group">
          <label for="usr"><h3>Email</h3></label>
          <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Your Email" id="email"/>
              <div class="input-group-append"><span class="input-group-text">@example.com</span></div>
          </div>
      </div>

    </div>
  </div>
  <button class="btn btn-block btn-primary " href="#edit" >Submit</button>
</div>

    </div>
  );
}
}
export default EditProfile;
