import React,{Component} from 'react';

class AddTitle extends Component{

  changeTitle=(e)=>{
    let name ="subtitle";
    this.props.onchange(e.target.value,name,this.props.count);
  }

  delContent=()=>{
    this.props.delC(this.props.count);
  }
  render(){
    let btn ='';
    if(this.props.important!==1){
    btn = <button onClick={this.delContent}>del</button>
  }
    return(
      <div class="form-group">
        <label for="title">title:</label>
        <input type="text"  class="form-control" id="title"
    onChange={this.changeTitle} name="title"/>
        {btn}
      </div>
    );
  }
}
export default AddTitle;
