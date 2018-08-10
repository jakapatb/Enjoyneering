import React,{Component} from 'react';
import {database} from '../firebase';
/*import trim from 'tirm';*/
class EditProfile extends Component{
  constructor(props){
   super(props);
   this.handleEditProfile = this.handleEditProfile.bind(this);
   this.state = {
     name: '',
     ids : '',
     degree: '',
     major: '',
     bdate: '',
   };
 }

 handleEditProfile=(e) => {
   const {name,ids,degree,major,bdate} =e.target;
     e.preventDefault();
       let dbCon =  database.ref('Users/').child(this.props.uid.uid);
     dbCon.update({
       name: name.value,
       ids:  ids.value,
       degre: degree.value,
       major: major.value,
       bdate: bdate.value,
     });
     window.location = '/profile';
   }


render(){
  const {name,degree,bdate,ids,major}=this.props.uid.data;
  return(

    <div class="container">
        <form onSubmit= {this.handleEditProfile}>
         <div class="col bg-light">
          <h1>Your Profile</h1>
           <div class="row">
    {/* left info */}
    <div class="col col-md-6 ">

      <div class="form-group">
          <label for="name"><h3>Name</h3></label>
          <input type="text" class="form-control" id="name" value={name}
      />
      </div>

      <div class="form-group">
          <label for="degree"><h3>Degree</h3></label>
          <input type="text" class="form-control" id="degree" value={degree}
      />
      </div>

      <div class="form-group">
          <label for="bdate"><h3>Date of Birth</h3></label>
          <input type="date" class="form-control" id="bdate" value={bdate}

        />
      </div>
    </div>
    {/* right info */}
    <div class="col col-md-6 ">

      <div class="form-group">
          <label for="ids"><h3>Student ID</h3></label>
          <input type="text" class="form-control" id="ids" value={ids}/>
      </div>

      <div class="form-group">
          <label for="major"><h3>Major</h3></label>
          <input type="text" class="form-control" id="major" value={major}
        />
      </div>



    </div>
  </div>
  <button class="btn btn-block btn-primary " href="/profile" type="submit">Submit</button>
</div>
    </form>
    </div>

  );
}
}
export default EditProfile;
