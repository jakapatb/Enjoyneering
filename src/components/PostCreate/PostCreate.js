import React, {Component} from 'react';
import {database} from '../../firebase';
import AddImg from './AddImg';
import AddContent from './AddContent';
import AddTitle from './AddTitle';
var moment = require('moment');
class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.createpost = this.createpost.bind(this);
    this.addData = this.addData.bind(this);
    this.addImg = this.addImg.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.addContent = this.addContent.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.tagSelector = this.tagSelector.bind(this);
    this.state={
      title:'',
      writer:'',
      content:[{type:'content',data:''}],
      imgTopic:[],
      optional:[],
      Tag:[],
      postTag:[],
      view:0
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

  getMessage(element) {
    const Ref = database.ref().child(element);
    Ref.on('value', snap => {
      this.setState({
        [element]: snap.val()
      })
    });
  }

  createpost=()=>{
    const {title,content,imgTopic,postTag,writer}=this.state;
    let firebaseRef = database.ref('Post/');
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    firebaseRef.push({
      title:title,
      writer:this.props.email,
      content:content,
      date:time,
      imgTopic:imgTopic,
      tag:postTag
    });
      window.location = '/';
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

  addTitle=()=>{
    this.addData(<AddTitle count={this.state.content.length} onchange={this.onChange}/>);
    let cRef = this.state.content;
    var ob = [{type:'subtitle',data:''}];
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

  componentDidMount() {
    this.getMessage('Tag');
  }

  tagSelector=(e)=>{
    const {postTag} = this.state;
    const value = e.target.value;
    if(postTag.includes(value)){
      postTag.splice(postTag.indexOf(value),1);
   }
   else{
     postTag.push(value);
   }
  }
  render() {
    const {Tag} = this.state;

    return (
      <div class="container-fluid">
      <div class="row">
        <div class="col col-md-6">
          <h1>Create post</h1>

            <div class="btn-group btn-group-toggle" data-toggle="buttons">
         <h2>Tags: {
              Tag.map((item,i) => {
                return (<button type="radio" class="btn btn-info" id={item} value={item} name="options" autocomplete="off" onClick={this.tagSelector}>
                  {item}
                </button>)
              })
            }</h2>
          </div>
            <div class="form-group">
              <label for="topic">Post Title:</label>
              <input type="text" class="form-control" id="topic"
                onChange={this.titleChange} name="title"/>
            </div>
            <AddContent count={0} onchange={this.onChange}/>

            <div id="btn-add-optional">
            <button onClick={this.addImg} class="btn btn-secondary disabled">Add image</button>
              <button onClick={this.addTitle} class="btn btn-secondary">Add Title</button>
            <button onClick={this.addContent} class="btn btn-secondary">Add Content</button>
            </div>
            <div id="optional">{this.state.optional}
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" onClick={this.createpost}>submit</button>
            </div>


        </div>
        <div class="col  bg-secondary">
          <h1>Preview</h1>
          <h1>{this.state.title}</h1>
          {
            this.state.content.map((element) => {
              if (element['type'] === 'subtitle') {
                return (<h2>{element['data']}</h2>);
              } else if (element['type'] === 'content') {
                return (<p>{element['data']}</p>);
              }
            })
          }
  </div>
        </div>
        </div>
);
  }
}

export default PostCreate;
