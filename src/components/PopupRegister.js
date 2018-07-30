import React,{Component} from 'react';
import * as firebase from 'firebase';
//import register from '../config/action_register.js';
class PopupRegister extends Component{
    
        handleSignUp=() => {
        var email=document.getElementById('email');
        var password=document.getElementById('password');
        var conpassword=document.getElementById('conpassword');
       if(email.value.length<4){
            alert("The email is too weak.");
            return;
        }
       if(password.value.length<4){
            alert("The password is too weak.");
            return;
        }
        if(password.value.length != conpassword.value.length){
            alert("Password Not Match!");
            return;
        }
        
        firebase.auth().createUserWithEmailAndPassword(email.value,password.value).catch(function(error){   
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == 'auth/weak-password'){
            alert('The password is too weak');
        }else{
            alert(errorMessage);
        }
        console.log(error);
    });
         
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
                   <form>
                    <div class="modal-body">

                        
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
                        <button class=" btn btn-primary" onClick={this.handleSignUp}>Sign up</button>
                    </div>
                   </form>
            </div>
        </div>


    </div>
  );
}


}

export default PopupRegister;