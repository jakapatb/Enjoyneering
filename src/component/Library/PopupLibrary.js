import React,{Component} from 'react';

class PopupLibrary extends Component{
  constructor(props){
    super(props);
    this.state={
      file:props.file
    };
  }
render(){
return(

  <div class="modal fade" id={this.state.file} tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>Login</h1>

          </div>
      </div>
  </div>
</div>
);
}
}


export default PopupLibrary;
