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
    let btn ='';
    if(this.props.important!==1){
    btn = <button onClick={this.delContent}>del</button>
  }
    return(
      <div class="form-group">
        <label for="cotnent">content:</label>
        <textarea class="form-control" rows="5" id="content"
    onChange={this.changeContent} ></textarea>
    {btn}
      </div>
    );
  }
}
export default AddContent;
