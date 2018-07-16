import React,{Component} from 'react';
import firebase from 'firebase';
class PopupRegister extends Component{
  constructor(props){
    super(props);
  }
  signUp(){
    //TODO ตรวจสอบแอ๊คเค้าท์ ถ้าไม่มีให้เพิ่ม
    var firebaseRef = firebase.database().ref();
    firebaseRef.child("Admin1").set("Root22");
    console.log('Signed Up');
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
                            <div class="form-group">
                            <label for="usr">Firstname:</label>
                                <input type="text" class="form-control" id="fname"/>
                            </div>
                            <div class="form-group">
                            <label for="usr">Lastname:</label>
                                <input type="text" class="form-control" id="lname"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="usr">Create password:</label>
                            <input type="text" class="form-control" id="pwd"/>
                        </div>
                        <div class="form-group">
                            <label for="usr">Confirm password:</label>
                            <input type="text" class="form-control" id="pwd2"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class=" mr-auto btn btn-sencondary text-black" data-toggle="modal" data-dismiss="modal" data-target="#login">Login</button>
                        <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                        <button class=" btn btn-primary" onClick={this.signUp}>Sign up</button>
                    </div>
                </form>

            </div>
        </div>


    </div>
  );
}


}

export default PopupRegister;
