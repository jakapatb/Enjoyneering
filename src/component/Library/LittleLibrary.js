import React,{Component} from 'react';
import PopupLibrary from './PopupLibrary';
import {Link} from 'react-router-dom';
class LittleLibrary extends Component{
  constructor(props){
    super(props);
    this.state={
      title:props.title,
      file:['file/database_1.ppt','file/database_2.ppt']
    };
  }

render(){
  return(
<div class="card">
    <img class="card-img-top img-fluid" src="img/education.jpg" alt="card"/>
    <div class="card-body ">
        <h3 class="card-text">{this.state.title}</h3>
        <button type="button" class="btn" data-toggle="collapse" data-target={"#"+this.state.title}>Chapter</button>
<div id={this.state.title} class="collapse">
<ul>
<Link class="nav-link" data-toggle="modal" data-target="#test" to="#login">File 1</Link>
</ul>
</div>
</div>
<div class="modal fade" id="test" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <embed src="file/database_1.pdf" width="1500px" height="2100px"/>
        </div>
    </div>
</div>
</div>
</div>
);
}

}
export default LittleLibrary;
