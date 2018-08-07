import React,{Component} from 'react';
import {storage} from '../../firebase';
var base64Img = require('base64-img');
var fs = require('fs');
class AddImg extends Component{
  constructor(props){
    super(props);
  }
  changeImg=(e)=>{

    let name ="imgTopic";
        var file =e.target.files[0];
    this.props.onchange(file,name,this.props.count);
  e.preventDefault();
  }



  // uploadImg(e){
  //   var file =e.target.files[0];
  //   var storageRef =storage.ref('Picture'+file.name);
  // //   var task=storageRef.put(file);
  // //   task.on('state_changed',function progress(snap){
  // //     var percentage=(snap.bytesTransferred/snap.totalByyes)*100;
  // //   },function error(err){console.log(err.messagge)}
  // //   ,function complete(){console.log('Uploaded')
  // // });
  // }

  render(){
    return(
      <div >
        <label for="img-post">Image Title{this.props.count}</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id={"imgpost"+this.props.count} onChange={this.changeImg}/>
          <label class="custom-file-label" for="custom-file">Image Title</label>
          </div>
           <img src='' id="preview"/>
      

            </div>
    );
  }
}
export default AddImg;
