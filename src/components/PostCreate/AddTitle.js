import React,{Component} from 'react';

class AddTitle extends Component{

  changeTitle=(e)=>{
    let name ="subtitle";
    console.log(e.target.value);
    this.props.onchange(e.target.value,name,this.props.count);
  }

  render(){
    return(
      <div class="form-group">
        <label for="title">title-{this.props.count+1}:</label>
        <input type="text"  class="form-control" id="title"
    onChange={this.changeTitle} name="title"/>
      </div>
    );
  }
}
export default AddTitle;
