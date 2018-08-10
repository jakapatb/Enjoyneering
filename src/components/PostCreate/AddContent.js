import React,{Component} from 'react';

class AddContent extends Component{

  changeContent=(e)=>{
    let name ="content";
    this.props.onchange(e.target.value,name,this.props.count);

  }

  delContent=()=>{
    this.props.delC(this.props.count);
  }

  render(){
    return(
      <div class="form-group">
        <label for="cotnent">content-{this.props.count}:</label>
        <textarea class="form-control" rows="5" id="content"
    onChange={this.changeContent} ></textarea>
    <button onClick={this.delContent}>del</button>
      </div>
    );
  }
}
export default AddContent;
