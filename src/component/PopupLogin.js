import React,{Component} from 'react';

class PopupLogin extends Component{
render(){
return(

  <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>Login</h1>

              </div>
      {/*To Do : creat new php page for login */}
              <form action="config/action_register.php">
                  <div class="modal-body">

                      <div class="form-group">
                          <label for="usr">E-mail:</label>
                          <input type="text" class="form-control" id="usr"/>
                      </div>
                      <div class="form-group">
                          <label for="usr">Password:</label>
                          <input type="text" class="form-control" id="pwd"/>
                      </div>

                  </div>
                  <div class="modal-footer">
                      <button class=" mr-auto btn btn-primary text-light" data-toggle="modal" data-dismiss="modal" data-target="#signup">Sign up</button>
                      <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                      <button type="submit" class=" btn btn-primary">Log in</button>
                  </div>
              </form>

          </div>
      </div>
  </div>

);
}
}


export default PopupLogin;
