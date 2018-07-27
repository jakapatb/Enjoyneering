import React, {Component} from 'react';
import {database} from '../../firebase';
import AddImg from './AddImg';
import PostPreview from './PostPreview';
import AddContent from './AddContent';
var moment = require('moment');
class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.createpost = this.createpost.bind(this);
    this.addData = this.addData.bind(this);
    this.addImg = this.addImg.bind(this);
    this.addContent = this.addContent.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.state={
      title:'',
      content:[{type:'content',data:''}],
      imgTopic:[],
      optional:[],
    };
  }

  onChange=(element,name,i)=>{
    let data = this.state.content;
    let point=data[i]
    point['data']=element;
    this.setState({
      [name]:[...data]
    });
    console.log(this.state.content)
  }

  titleChange(e){
    this.setState({
      title:e.target.value
    })
  }

  createpost=()=>{
    let firebaseRef = database.ref('Post/');
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    firebaseRef.push({
      title:this.state.title,
      content:this.state.content,
      date:time,
      imgTopic:this.state.imgTopic
    });
    console.log(this.state)
  }

  addImg=()=>{
    // this.addData(<AddImg count={this.state.imgTopic.length} onchange={this.onChange}/>);
    // let iRef = this.state.imgTopic;
    // var ob = [['imgTopic','']];
    // cRef.push.apply(cRef,ob);
    // iRef.push('');
  }

  addContent=()=>{
    this.addData(<AddContent count={this.state.content.length} onchange={this.onChange}/>);
    let cRef = this.state.content;
    var ob = [{type:'content',data:''}];
    cRef.push.apply(cRef,ob);
    console.log(this.state);
  }

  addData=(data)=>{
    let Ref = this.state.optional;
    Ref.push(data);
    this.setState({
      optional:Ref
    });
  }

  render() {

    return (
      <div class="row">
        <div class="col col-md-6">
          <h1>Create post</h1>


            <div class="form-group">
              <label for="topic">Post Title:</label>
              <input type="text" class="form-control" id="topic"
                onChange={this.titleChange} name="title"/>
            </div>
            <AddContent count={0} onchange={this.onChange}/>
            <div id="optional">{this.state.optional}
            </div>
            <div id="btn-add-optional">
            <button onClick={this.addImg} class="btn btn-secondary">Add image</button>
            <button onClick={this.addContent} class="btn btn-secondary">Add Content</button>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary" onClick={this.createpost}>submit</button>
            </div>


        </div>
        <div class="col  bg-secondary">
          <h1>Preview</h1>
          <h1>title:{this.state.title}</h1>
          <h1>content:{this.state.content.map((element)=>(
            <div>{element['data']}</div>
          ))}</h1>
  </div>
        </div>
);
  }
}

export default PostCreate;
