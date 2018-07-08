import React,{Component} from 'react';


class PopupRegister extends Component{
render(){
  return(
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Sign up</h1>
  {/*TO DO : creat new php page for create account */}
                </div>
                <form action="config/action_register.php">
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="usr">Username:</label>
                            <input type="text" class="form-control" id="usr"/>
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
                            <input type="text" class="form-control" id="pwd"/>
                        </div>
                        <div class="form-group">
                            <label for="usr">Confirm password:</label>
                            <input type="text" class="form-control" id="pwd2"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class=" mr-auto btn btn-primary text-light" data-toggle="modal" data-dismiss="modal" data-target="#login">Login</a>
                        <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                        <button type="submit" class=" btn btn-primary">Sign up</button>
                    </div>
                </form>

            </div>
        </div>


    </div>
  );
}


}

export default PopupRegister;