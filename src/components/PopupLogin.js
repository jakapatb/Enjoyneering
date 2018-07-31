import React,{Component} from 'react';
import * as firebase from 'firebase';
class PopupLogin extends Component{
/* Signin= () => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email.value,password.value).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password'){
    alert('Worng password.');
  }else {
    alert(errorMessage);
  }
  console.log(error);

});
}*/
constructor(props){
  super(props);
  this.login=this.login.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.state={
    email:'',
    password:''
  }
}
login(e){
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{}).catch((error)=>{
    console.log(error)
  });

}
handleChange(e){
  this.setState({[e.target.name]:e.target.value});
}
render(){
return(

  <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>Login</h1>

              </div>
      {/*To Do : creat new php page for login */}
              <form>
                  <div class="modal-body">

                      <div class="form-group">
                          <label for="usr">E-mail:</label>
                          <input  value={this.state.email} onChange={this.handleChange} type="text" name="email" class="form-control" id="email"/>
                      </div>
                      <div class="form-group">
                          <label for="pwd">Password:</label>
                          <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="password"/>
                      </div>

                  </div>
                  <div class="modal-footer">
                      <button class=" mr-auto btn btn-sencondary text-black" data-toggle="modal" data-dismiss="modal" data-target="#signup">Sign up</button>
                      <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                      <button type="submit" class=" btn btn-primary" onClick={this.login} data-dismiss="modal">Log in</button>
                  </div>
              </form>
          </div>
      </div>
  </div>

);
}
}

export default PopupLogin;
