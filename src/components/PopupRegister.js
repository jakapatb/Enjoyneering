import React,{Component} from 'react';
import * as firebase from 'firebase';
import {database} from '../firebase';
class PopupRegister extends Component{
  constructor(props){
   super(props);
   this.handleSignUp = this.handleSignUp.bind(this);
 }
        handleSignUp=(e) => {
          const {username,email,password,conpassword} =e.target;

       if(email.value.length<4){
            alert("The email is too weak.");
            return;
        }
       else if(password.value.length<4){
            alert("The password is too weak.");
            return;
        }
        else if(password.value.length !== conpassword.value.length){
            alert("Password Not Match!");
            return;
        }
      firebase.auth().createUserWithEmailAndPassword(email.value,password.value).then(function(user){
      var User = firebase.auth().currentUser;
      var uid = User.uid;
      let dbCon =  database.ref('Users/').child(uid);
      dbCon.set({
        email:email.value,
        username:username.value,
      });
    }).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode === 'auth/weak-password'){
        alert('The password is too weak');
    }else{
        alert(errorMessage);
    }
    console.log(error);
});
      e.preventDefault();
    }
render(){
  return(
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Sign up</h1>
  {/*TO DO : creat new php page for create account */}
                </div>
                   <form onSubmit={this.handleSignUp}>
                    <div class="modal-body">
                       <div class="form-group">
                          <label for="usr">Username:</label>
                          <input type="text" class="form-control" id="username"/>
                       </div>


                        <div class="form-group">
                            <label for="usr">Email address:</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Your Email" id="email"/>
                                <div class="input-group-append"><span class="input-group-text">@example.com</span></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="usr">Create password:</label>
                            <input type="password" class="form-control" id="password"/>
                        </div>

                        <div class="form-group">
                            <label for="usr">Comfirm password:</label>
                            <input type="password" class="form-control" id="conpassword"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class=" mr-auto btn btn-sencondary text-black" data-toggle="modal" data-dismiss="modal" data-target="#login">Login</button>
                        <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                        <button class=" btn btn-primary" type="submit">Sign up</button>
                    </div>
                   </form>
            </div>
        </div>


    </div>
  );
}


}

export default PopupRegister;
