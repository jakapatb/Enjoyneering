import React,{Component} from 'react';

class AddImg extends Component{
  changeImg=(e)=>{
    let name ="imgTopic";
    this.props.onchange(e.target.value,name,this.props.count);
  }
  render(){
    return(
      <div class="form-group">
        <label for="img-post">Image Title{this.props.count}</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="img-post" onChange={this.changeContent} />
          <label class="custom-file-label" for="custom-file">Image Title</label>
        </div>
            </div>
    );
  }
}
export default AddImg;
