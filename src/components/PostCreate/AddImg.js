import React,{Component} from 'react';
class AddImg extends Component{
  changeImg=(e)=>{

    let name ="imgTopic";
        var file =e.target.files[0];
    this.props.onchange(file,name,this.props.count);
  e.preventDefault();
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
      <div >
        <label for="img-post">Image:</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id={"imgpost"+this.props.count} onChange={this.changeImg}/>
          <label class="custom-file-label" for="custom-file">Image Title</label>
        </div>
        {btn}

            </div>
    );
  }
}
export default AddImg;
